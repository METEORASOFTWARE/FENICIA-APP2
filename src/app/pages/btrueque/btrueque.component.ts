import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FeniciaWsService } from 'src/app/servicios/fenicia-ws.service';
import { TruequeService } from 'src/app/servicios/trueque.service';

@Component({
  selector: 'app-btrueque',
  templateUrl: './btrueque.component.html',
  styleUrls: ['./btrueque.component.scss'],
})
export class BtruequeComponent  implements OnInit {

  tipos:any
  token:any

  constructor(
    public tipo: FeniciaWsService, 
    private truequeService:TruequeService,
    private authService:AuthService) { }

  ngOnInit() {
    console.log('OnInit');

    this._getTrueque();
  }

  private async _getTrueque(){

		var tokenGenerated = await this.authService.generateToken();

		await this.truequeService.getTrueque().subscribe(
			response => {
				
				if( response.success ){

					this.tipos = response.data;
				}
				else{

					alert( 'la Api envío errores' );
				}
			},
			error => {
			  console.error(error);
			  alert('ocurrio un error inesperado');
			}
		  );
		// this.tipos=data;
	}

}
