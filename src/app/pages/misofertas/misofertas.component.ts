import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfertasService } from 'src/app/servicios/ofertas/ofertas.service';

@Component({
  selector: 'app-misofertas',
  templateUrl: './misofertas.component.html',
  styleUrls: ['./misofertas.component.scss'],
})
export class MisofertasComponent  implements OnInit {

  LISTA_OFERTAS : any;
  constructor(
    private ofertaSrv: OfertasService
  ) { }

  ngOnInit() {
    this.ofertaSrv.get('FE-0000001')
    .subscribe( (res: any) => {
      this.LISTA_OFERTAS = res.data;
    });
  }

}
