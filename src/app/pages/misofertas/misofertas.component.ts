import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OfertasService } from 'src/app/servicios/ofertas/ofertas.service';

import { MisOfertasDTO, MisOfertasListaDTO } from 'src/app/interface/misOfertas-interface';
import { ImagesOfertasComponent } from '../shared/images-ofertas/images-ofertas.component';
import { UserInfoData } from 'src/app/interface/user-info-interface';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { SheetEditOfertaComponent } from './sheet-edit-oferta/sheet-edit-oferta.component';

@Component({
  selector: 'app-misofertas',
  templateUrl: './misofertas.component.html',
  styleUrls: ['./misofertas.component.scss'],
})
export class MisofertasComponent  implements OnInit {

  datosResponse!: MisOfertasDTO;
  LOADING_DATOS: boolean = false;
  INFO_USER: UserInfoData | null;
  
  constructor(
    private ofertaSrv: OfertasService,
    private modalCtrl: ModalController,
    private authSrv: AuthService,
    
  ) { 
    this.INFO_USER = this.authSrv.getInfoUserLocalStorage();
    
  }

  ngOnInit() {
    this.loadDataInit();
  }

  loadDataInit(ev: any = null) {
    this.LOADING_DATOS = true;
    this.ofertaSrv.get(this.INFO_USER?.COD_CLIE ?? "")
    .subscribe( (res: any) => {
      this.LOADING_DATOS = false;
      this.datosResponse = res;
      if (ev) ev.target.complete();
    },( (error: any) => {
      this.LOADING_DATOS = false;
      this.datosResponse = error.error
      if (ev) ev.target.complete();
    }),() => {
      this.LOADING_DATOS = false;
      if (ev) ev.target.complete(); 
    } 
    );
  }

  async viewImages( data: MisOfertasListaDTO ) {
    const modalImages = await this.modalCtrl.create({
      component: ImagesOfertasComponent,
      componentProps: { data },
      backdropDismiss: false
    });
    modalImages.present();
  }

  handleRefresh(ev: any) {
    this.loadDataInit(ev);
  }

  async edit(datos: MisOfertasListaDTO) {

    const modal = await this.modalCtrl.create({
      component: SheetEditOfertaComponent,
      backdropDismiss: false,
      initialBreakpoint : 0.75,
      breakpoints: [0, 0.25, 0.5, 0.75],
      handleBehavior: `cycle`,
      componentProps: {datos: datos} 
    });

    modal.onDidDismiss()
    .then( (res:any) => {
      if (res.data) {
        this.loadDataInit();
      }
    })
    modal.present();
  }

}
