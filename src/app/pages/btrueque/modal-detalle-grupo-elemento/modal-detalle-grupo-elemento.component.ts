import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataDetalleGrupoElemento, DetalleGrupoElementoInterface } from 'src/app/interface/detalle-grupo-elemento-interface';
import { NoDatos } from 'src/app/interface/no-datos';
import { TruequeService } from 'src/app/servicios/trueque/trueque.service';

@Component({
  selector: 'app-modal-detalle-grupo-elemento',
  templateUrl: './modal-detalle-grupo-elemento.component.html',
  styleUrls: ['./modal-detalle-grupo-elemento.component.scss'],
})
export class ModalDetalleGrupoElementoComponent  implements OnInit {

  DETALLE_GRUPO_ELEMENTOS : DetalleGrupoElementoInterface = {}; 
  NO_DATOS : NoDatos = {}; 
  LOADING_DATOS: boolean = false;
  @Input() id: number = 0;
  
  constructor(
    public modalCtrl: ModalController,
    private truequeSrv: TruequeService
  ) { }

  ngOnInit() {
    this.getDetalleGrupoElementos(this.id);
  }

  hideModal() {
    this.modalCtrl.dismiss();
  }

  getDetalleGrupoElementos(id: number) {
    this.LOADING_DATOS = true;

    this.truequeSrv.getDetalleGrupoElementos(id)
    .subscribe( (res: DetalleGrupoElementoInterface) => {
      this.LOADING_DATOS = false;
      this.DETALLE_GRUPO_ELEMENTOS = res;
      console.log(this.DETALLE_GRUPO_ELEMENTOS)
    }, (error) => {
        this.LOADING_DATOS = false;
        this.NO_DATOS = error?.error;
        console.log( this.NO_DATOS)
    })
  }

}
