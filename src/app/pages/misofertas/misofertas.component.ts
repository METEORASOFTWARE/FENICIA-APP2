import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/servicios/ofertas/ofertas.service';

@Component({
  selector: 'app-misofertas',
  templateUrl: './misofertas.component.html',
  styleUrls: ['./misofertas.component.scss'],
})
export class MisofertasComponent  implements OnInit {

  LISTA_OFERTAS : any;
  INFO_USER: any = '';

  constructor(
    private ofertaSrv: OfertasService
  ) { 
    this.INFO_USER = localStorage.getItem('_infoUser');
    this.INFO_USER = JSON.parse(this.INFO_USER);
  }

  ngOnInit() {
    this.ofertaSrv.get(this.INFO_USER.COD_CLIE)
    .subscribe( (res: any) => {
      this.LISTA_OFERTAS = res.data;
    });
  }

}
