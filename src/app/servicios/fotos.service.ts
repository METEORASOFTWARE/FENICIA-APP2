import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  fotos: string [] = [];

  constructor() { }

  async agregarFoto(){
    const foto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90
    });
    if (foto.base64String) {
      const imageUrl = `data:image/jpeg;base64,${foto.base64String}`;
      this.fotos.push(imageUrl);
    }
  }
}
