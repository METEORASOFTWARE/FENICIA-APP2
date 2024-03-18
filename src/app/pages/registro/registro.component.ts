import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UserInfoData } from 'src/app/interface/user-info-interface';
import { DeviceInfoService } from 'src/app/servicios/device-info/device-info.service';
import { DeviceInfoPWA } from 'src/app/interface/device-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/servicios/registro/registro.service';
import { concatMap, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes/mensajes.service';


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
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
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
      })
    ).subscribe( (res:any) => {
      console.log(`data`, res)
      this.smsSrv.openSuccess( res.message )
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url])
      })
      this.smsSrv.closeLoading();
    });
  }

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
    const role = ev.detail.role;
    if (role === 'confirm') {
      this.save();
    }

  }


}
