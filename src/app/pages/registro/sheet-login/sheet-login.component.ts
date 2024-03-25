import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { catchError, concatMap, map, of } from 'rxjs';
import { UserCreatedInterface, UserInfoCreatedInterface, UserInfoData, UserInfoInterface } from 'src/app/interface/user-info-interface';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { DeviceInfoService } from 'src/app/servicios/device-info/device-info.service';
import { MensajesService } from 'src/app/servicios/mensajes/mensajes.service';
import { RegistroService } from 'src/app/servicios/registro/registro.service';

@Component({
  selector: 'app-sheet-login',
  templateUrl: './sheet-login.component.html',
  styleUrls: ['./sheet-login.component.scss'],
})
export class SheetLoginComponent  implements OnInit {

  FORM: FormGroup;
  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private registroSrv: RegistroService,
    private authSrv: AuthService,
    private smsSrv: MensajesService,
    private deviceSrv: DeviceInfoService
  ) { 
    this.FORM = this.createForm();
  }

  ngOnInit() {

  }

  private createForm(){
    return this.fb.group({
      pwaid: ['', Validators.required],
    });
  }

  closeModal(flag: boolean) {
    this.modalCtrl.dismiss(flag)
  }

  async login() {
    this.smsSrv.openLoading();

    const data = this.FORM.value

    this.authSrv.getInfoUser(data.pwaid)
    .pipe(
      catchError( (error: any) => {
        const newError : UserInfoInterface = error.error;
        return of(newError);
      }),
      concatMap( (info: UserInfoInterface) => {
        let data : UserInfoCreatedInterface
        if (info.success) {
          var registroData = new URLSearchParams();
          registroData.append("codigo", info.data[0].COD_CLIE.toString().trim());
          registroData.append("pwaid", this.FORM.get('pwaid')?.value);
          return this.registroSrv
          .put(registroData)
          .pipe(
            map(( updated: UserCreatedInterface) => {
              data = { create: updated, info: info }
              return data;
            })
          );
        } else {
          data = { create: null, info: null }
          return of(data)
        }
      })
    ).subscribe({
      next: (res: UserInfoCreatedInterface) => {
        if (res.create) {
          let datosUsuario : UserInfoData | null = null;

          if (res.info )
            datosUsuario = res.info?.data[0];

          if (datosUsuario) {
            this.smsSrv.openSuccess(res.create.message);
            this.authSrv.setInfoUserLocalStorage( datosUsuario );
            this.deviceSrv.updateInfoDeviceLocalStorage(this.FORM.get('pwaid')?.value)
            this.modalCtrl.dismiss(true);
          }

        } else {
          this.smsSrv.openError(`Error al ingreso`)
        }
        this.smsSrv.closeLoading();
      },
      error: (error: any) => {
        this.smsSrv.openError(`Error en la petición`)
      }
    })



  }

}
