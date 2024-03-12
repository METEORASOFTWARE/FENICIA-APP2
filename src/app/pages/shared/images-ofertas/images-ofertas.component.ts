import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MisOfertasImagesDTO, MisOfertasListaDTO } from 'src/app/interface/misOfertas-interface';
import { OfertasService } from 'src/app/servicios/ofertas/ofertas.service';

@Component({
  selector: 'app-images-ofertas',
  templateUrl: './images-ofertas.component.html',
  styleUrls: ['./images-ofertas.component.scss'],
})
export class ImagesOfertasComponent  implements OnInit {

  @Input() data: MisOfertasListaDTO = {};
  datosResponse!: MisOfertasImagesDTO;
  LOADING_DATOS: boolean = false;
  
  constructor(
    public modalCtrl: ModalController,
    private ofertaSrv: OfertasService,
  ) { }


  ngOnInit() {
    this.LOADING_DATOS = true;

    this.ofertaSrv.getImages(this.data.COD_PRODUCTO)
    .subscribe( (res: MisOfertasImagesDTO) =>  {
      this.datosResponse = res;
      this.LOADING_DATOS = false;
    }, ( error : any ) => {
      this.datosResponse = error.error
      this.LOADING_DATOS = false;
    }, () => {
      this.LOADING_DATOS = false;
    })
  }

}
