import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataGrupoElementos, GrupoElementoInterface } from 'src/app/interface/grupo-elemento-interface';
import { TruequeService } from 'src/app/servicios/trueque/trueque.service';
import { ModalDetalleGrupoElementoComponent } from './modal-detalle-grupo-elemento/modal-detalle-grupo-elemento.component';

@Component({
  selector: 'app-btrueque',
  templateUrl: './btrueque.component.html',
  styleUrls: ['./btrueque.component.scss'],
})
export class BtruequeComponent  implements OnInit {

  GRUPO_ELEMENTOS : GrupoElementoInterface | null = null;

  constructor(
    private truequeSrv: TruequeService,
    private modalCtrl: ModalController
    
	) { }

  ngOnInit() {
    this.truequeSrv.getGrupoElementos()
    .subscribe((res: GrupoElementoInterface) => {
      this.GRUPO_ELEMENTOS = res;
    })
  }

  async show(id: number) {

    const modal = await this.modalCtrl.create({
      component: ModalDetalleGrupoElementoComponent,
      backdropDismiss: false,
      componentProps: {
        id
      } 
    });

    modal.present();
  }
  

}
