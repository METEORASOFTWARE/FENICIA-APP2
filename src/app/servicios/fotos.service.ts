import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  fotos: string [] = [];

  constructor() { }

  async agregarFoto(){
    /*const foto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      height: 1000,
      quality: 10
    });
    if (foto.dataUrl) {
      this.fotos.unshift(foto.dataUrl);
    }*/
    
    const foto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90 // Ajusta la calidad según sea necesario
    });

    if (foto.base64String) {
      // Prefijo necesario para mostrar una imagen base64 en HTML
      const imageUrl = `data:image/jpeg;base64,${foto.base64String}`;
      this.fotos.push(imageUrl);
    }
  }
}
