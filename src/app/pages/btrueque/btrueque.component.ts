import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataGrupoElementosDTO, GrupoElementoDTO } from 'src/app/interface/grupo-elemento-interface';
import { TruequeService } from 'src/app/servicios/trueque/trueque.service';
import { ModalDetalleGrupoElementoComponent } from './modal-detalle-grupo-elemento/modal-detalle-grupo-elemento.component';

@Component({
  selector: 'app-btrueque',
  templateUrl: './btrueque.component.html',
  styleUrls: ['./btrueque.component.scss'],
})
export class BtruequeComponent  implements OnInit {

  datosResponse!: GrupoElementoDTO;
  LOADING_DATOS: boolean = false;

  constructor(
    private truequeSrv: TruequeService,
    private modalCtrl: ModalController
    
	) { }

  ngOnInit() {
    this.loadDataInit();
  }

  async show(data: DataGrupoElementosDTO) {

    const modal = await this.modalCtrl.create({
      component: ModalDetalleGrupoElementoComponent,
      backdropDismiss: false,
      componentProps: {
        data
      } 
    });

    modal.present();
  }

  loadDataInit(ev: any = null) {
    this.LOADING_DATOS = true;
    this.truequeSrv.getGrupoElementos()
    .subscribe((res: GrupoElementoDTO) => {
      this.LOADING_DATOS = false;
      this.datosResponse = res;
      if (ev) ev.target.complete();
    },(error : any)=> {
      this.LOADING_DATOS = false;
      this.datosResponse = error.error
      if (ev) ev.target.complete();
    })
  }

  handleRefresh(ev: any) {
    this.loadDataInit(ev);
  }
  

}
