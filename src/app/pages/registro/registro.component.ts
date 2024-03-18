import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UserInfoData } from 'src/app/interface/user-info-interface';
import { DeviceInfoService } from 'src/app/servicios/device-info/device-info.service';
import { DeviceInfoPWA } from 'src/app/interface/device-info';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  UUID_DEVICE: DeviceInfoPWA | null;
  INFO_USER: UserInfoData | null;

  constructor(
    private toastController: ToastController,
    private authSrv: AuthService,
    private deviSrv: DeviceInfoService
  ) { 
    this.INFO_USER = this.authSrv.getInfoUserLocalStorage();
    this.UUID_DEVICE = this.deviSrv.getInfoDeviceLocalStorage()
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



}
