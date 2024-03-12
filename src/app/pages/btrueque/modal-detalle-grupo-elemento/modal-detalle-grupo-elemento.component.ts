import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataDetalleGrupoElementoDTO, DetalleGrupoElementoDTO } from 'src/app/interface/detalle-grupo-elemento-interface';
import { DataGrupoElementosDTO } from 'src/app/interface/grupo-elemento-interface';
import { MisOfertasListaDTO } from 'src/app/interface/misOfertas-interface';

import { responseAPIDTO } from 'src/app/interface/response-interface';
import { TruequeService } from 'src/app/servicios/trueque/trueque.service';
import { ImagesOfertasComponent } from '../../shared/images-ofertas/images-ofertas.component';


@Component({
  selector: 'app-modal-detalle-grupo-elemento',
  templateUrl: './modal-detalle-grupo-elemento.component.html',
  styleUrls: ['./modal-detalle-grupo-elemento.component.scss'],
})
export class ModalDetalleGrupoElementoComponent  implements OnInit {

  // DETALLE_GRUPO_ELEMENTOS : DetalleGrupoElementoInterface = {}; 
  // NO_DATOS : responseAPIDTO = {}; 

  datosResponse!: DetalleGrupoElementoDTO;
  LOADING_DATOS: boolean = false;
  @Input() data!: DataGrupoElementosDTO;
  
  constructor(
    public modalCtrl: ModalController,
    private truequeSrv: TruequeService
  ) { }

  ngOnInit() {
    this.getDetalleGrupoElementos(this.data.COD_NIVEL);
  }

  hideModal() {
    this.modalCtrl.dismiss();
  }

  getDetalleGrupoElementos(id: any, ev: any = null) {
    this.LOADING_DATOS = true;

    this.truequeSrv.getDetalleGrupoElementos(id)
    .subscribe( (res: DetalleGrupoElementoDTO) => {
      this.LOADING_DATOS = false;
      this.datosResponse = res;
      if (ev) ev.target.complete();
      
    }, (error) => {
        this.LOADING_DATOS = false;
        this.datosResponse = error.error
        if (ev) ev.target.complete();
    })
  }

  async viewImages( datos : DataDetalleGrupoElementoDTO) {
    const data:MisOfertasListaDTO = {
      COD_PRODUCTO :  datos.COD_PRODUCTO,
      NOM_PRODUCTO: datos.NOM_PRODUCTO,
      DESC_NIVEL: this.data.DESC_NIVEL
    }

    const modalImages = await this.modalCtrl.create({
      component: ImagesOfertasComponent,
      componentProps: { data },
      backdropDismiss: false
    });
    modalImages.present();
  }

  handleRefresh(ev: any) {
    this.getDetalleGrupoElementos(this.data.COD_NIVEL, ev);
  }

}
