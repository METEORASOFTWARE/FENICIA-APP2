import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  UUID_DEVICE: any = '';
  INFO_USER: any = '';

  constructor(
    private toastController: ToastController
  ) { 
    this.UUID_DEVICE = localStorage.getItem('_uuid_device');
    this.INFO_USER = localStorage.getItem('_infoUser');
  }

  ngOnInit() {
    this.INFO_USER = JSON.parse(this.INFO_USER);
  }

  async copyPWAID() {

    await Clipboard.write({
      string: this.UUID_DEVICE
    });

    await this.presentToast();

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `ID ${ this.UUID_DEVICE } copiado correctamente`,
      duration: 1500,
      position: `top`,
    });

    await toast.present();
  }



}
