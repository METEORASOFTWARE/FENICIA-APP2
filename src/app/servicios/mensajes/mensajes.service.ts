import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  loading: any;
  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }


  async openLoading() {

    this.loading = await this.loadingController.create({
      message: 'Por favor espere...',
      // duration: 2000
    });
    await this.loading.present();
  }

  closeLoading() {
    this.loading.dismiss();
  }

  async openSuccess( sms: string) {
    const toast = await this.toastController.create({
      message: sms,
      duration: 3000,
      color: 'dark',
      icon: 'checkmark-done-circle',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]      
    });
    toast.present();
  }

}
