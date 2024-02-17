import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { FeniciaWsService } from 'src/app/servicios/fenicia-ws.service';
import { FotosService } from 'src/app/servicios/fotos.service';
import { TruequeService } from 'src/app/servicios/trueque.service';

@Component({
  selector: 'app-trueque',
  templateUrl: './trueque.component.html',
  styleUrls: ['./trueque.component.scss'],
})
export class TruequeComponent  implements OnInit {

  fotos: string[];
  nextId: number| null = null;
  nombreDelServicio: string = '';
  descripcionDelServicio: string = '';
  idCurrent:any;
  parFenicia:any;
  categorys:any;

  constructor(
    private fotosService: FotosService,
    private truequeService:TruequeService,
    private authService:AuthService,
    private loadingController:LoadingController,
    private feniciaWsService:FeniciaWsService
  ) { 
    this.fotos = this.fotosService.fotos;
    this.authService.generateToken();
  }

  ngOnInit() {
    console.log('OnInit');

	  this._getCategory();
  }

  private async _getCategory(){

		var tokenGenerated = await this.authService.generateToken();

		await this.truequeService.getTrueque().subscribe(
			response => {
				
				if( response.success ){

					this.categorys = response.data;
				}
			},
			error => {
			  console.error(error);
			  alert('ocurrio un error inesperado');
			}
		);
	}

  _sendFotos(){
    debugger;
    this.fotos.map((f)=>{

    });
  }

  async tomarFoto () {
    await this.fotosService.agregarFoto();
  }

  async enviarFormulario() {

    var tokenGenerated = await this.authService.generateToken();
    this.presentLoading();
    this.createDataTruque();
  }

  createDataTruque(){

    this.truequeService.getNextId().subscribe(
      (respuesta) => {

        this.idCurrent = respuesta.data[0][""];
        this.idCurrent = this.idCurrent.toString().padStart(7, '0');
        this.authService.generateToken();
        
        this.truequeService.getPar().subscribe(
          (respuesta) => {
            const parData = respuesta.data[0];

            this.parFenicia = parData;

            var productData = new URLSearchParams();
            productData.append("codigo", parData.A29_PRE+this.idCurrent);
            productData.append("unidad", "U");
            productData.append("nombre", this.nombreDelServicio);
            productData.append("usuario", "FE-0000001");
            productData.append("descripcion", this.descripcionDelServicio);
            productData.append("agrextra", "224");

            this.authService.generateToken();

            this.truequeService.createProduct(productData).subscribe(
              (respuesta) => {
                console.log(respuesta);
                
                if(respuesta.success){
                  this._sendFotos();
                }
                else{
                  alert(respuesta.message);
                }
              },
              (error) => {
                console.error(error);
              }
            );
          },
          (error) => {
            console.error(error);
          }
        );

        this.loadingController.dismiss();
      },
      (error) => {
        console.error(error);

        this.loadingController.dismiss();
      }
    );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 3000
    });

    await loading.present();
  } 

}
