import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Clipboard } from '@capacitor/clipboard';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UserCreatedInterface, UserInfoCreatedInterface, UserInfoData, UserInfoInterface } from 'src/app/interface/user-info-interface';
import { DeviceInfoService } from 'src/app/servicios/device-info/device-info.service';
import { DeviceInfoPWA } from 'src/app/interface/device-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/servicios/registro/registro.service';
import { catchError, concatMap, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes/mensajes.service';
import { MenuService } from 'src/app/servicios/menu/menu.service';
import { responseAPIDTO } from 'src/app/interface/response-interface';
import { SheetLoginComponent } from './sheet-login/sheet-login.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  UUID_DEVICE: DeviceInfoPWA | null;
  INFO_USER: UserInfoData | null;
  FORM: FormGroup;

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {},
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {},
    },
  ];

  constructor(
    private toastController: ToastController,
    private authSrv: AuthService,
    private deviSrv: DeviceInfoService,
    private fb: FormBuilder,
    private registroSrv: RegistroService,
    private router: Router,
    private smsSrv: MensajesService,
    private menuSrv: MenuService,
    private modalCtrl: ModalController,
  ) { 
    this.INFO_USER = this.authSrv.getInfoUserLocalStorage();
    
    this.UUID_DEVICE = this.deviSrv.getInfoDeviceLocalStorage();
    this.FORM = this.createForm();
  }
  
  ngOnInit() {
    
  }

  async copyPWAID() {

    await Clipboard.write({
      string: this.UUID_DEVICE?._uuid_device
    });

    await this.presentToast();

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `ID ${ this.UUID_DEVICE?._uuid_device } copiado correctamente`,
      duration: 1500,
      position: `top`,
    });

    await toast.present();
  }

  private createForm(){
    return this.fb.group({
      codigo: [''],
      nombre: [ '' , [ Validators.required ] ],
      telefono: [ '' , [ Validators.required ] ],
      email: [ '' , [ Validators.required ] ],
      pwaid: [''],
    });
  }

  save() {
    this.smsSrv.openLoading()
    this.registroSrv.getNextId()
    .pipe( 
      concatMap(( res: any ) => {

        var idCurrent = res.data[0][""];
        idCurrent = idCurrent.toString().padStart(7, '0');
        return of(idCurrent)
      }),
      concatMap( (res: any) => {
        return this.registroSrv.getPar()
        .pipe(  
          map((pair: any) => {
            const parData = pair.data[0];
            res = parData.A29_PRE+res;
            return res;
          })
        );
      }),
      concatMap( (res: string) => {
        var registroData = new URLSearchParams();
        registroData.append("codigo", res.toString());
        registroData.append("nombre", this.FORM.get('nombre')?.value );
        registroData.append("telefono", this.FORM.get('telefono')?.value);
        registroData.append("email", this.FORM.get('email')?.value);
        registroData.append("pwaid", this.UUID_DEVICE?._uuid_device ?? "");

        return this.registroSrv.post(registroData)
        .pipe(
          catchError( (error: responseAPIDTO) => {
            return of(null)
          })
        )
      }),
      concatMap( (create: UserCreatedInterface | null) => {
        let data : UserInfoCreatedInterface
        if (create !== null) {
          return this.authSrv.getInfoUser(this.UUID_DEVICE?._uuid_device)
          .pipe(
            map( (info: UserInfoInterface) => {
              data = { create: create, info: info }
              return data
            })
          )
        } else {
          data = { create: create, info: null }
          return of (data )
        }
      })
    ).subscribe( ( user : UserInfoCreatedInterface ) => {
      if (user.create) {
        
        let datosUsuario : UserInfoData | null = null;

        if (user.info )
          datosUsuario = user.info?.data[0];

        if (datosUsuario) {
          this.authSrv.setInfoUserLocalStorage( datosUsuario );
          this.INFO_USER = this.authSrv.getInfoUserLocalStorage();
          this.smsSrv.openSuccess( user?.create.message ?? `Usuario registrado correctamente` )
          this.menuSrv.rebuildMenu();
        }
      } else {
        this.smsSrv.openError(`Error al registrar cliente` )
      }
      this.smsSrv.closeLoading();
    });
  }

  setResult(ev: any) {
    const role = ev.detail.role;
    if (role === 'confirm') {
      this.save();
    }
  }

  async openSheetLogin() {
    const modal = await this.modalCtrl.create({
      component: SheetLoginComponent,
      backdropDismiss: false,
      initialBreakpoint : 0.50,
      breakpoints: [0, 0.25, 0.5, 0.75],
      handleBehavior: `cycle`,
      componentProps: {
        // error
      } 
    });

    modal.onDidDismiss()
    .then( (res:any) => {
      if (res.data) {
        this.INFO_USER = this.authSrv.getInfoUserLocalStorage();
        this.menuSrv.rebuildMenu();
      }
    })

    modal.present();
  }


}
