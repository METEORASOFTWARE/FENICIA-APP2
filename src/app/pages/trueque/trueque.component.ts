import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { DataGrupoElementos, GrupoElementoInterface } from 'src/app/interface/grupo-elemento-interface';
import { FotosService } from 'src/app/servicios/fotos.service';
import { MensajesService } from 'src/app/servicios/mensajes/mensajes.service';
import { TruequeService } from 'src/app/servicios/trueque/trueque.service';

import { Device } from '@capacitor/device';
import { ModalSubcategoriaComponent } from './modal-subcategoria/modal-subcategoria.component';
import { Toast } from '@capacitor/toast';


@Component({
  selector: 'app-trueque',
  templateUrl: './trueque.component.html',
  styleUrls: ['./trueque.component.scss'],
})
export class TruequeComponent  implements OnInit {

  FORM: FormGroup;
  GRUPO_ELEMENTOS : DataGrupoElementos[] = []
  CATEGORIAS : DataGrupoElementos[] = []
  SUB_CATEGORIAS : DataGrupoElementos[] = []
  fotos: string[] = [];
  isAlertOpen = false;
  DATA_DEVICE = { info : { model: null, osVersion: null, platform: null}, id : { identifier : null }};
  SELECT_SUB: number = 0

  public categoriasActions = [
    {
      text: 'Eliminar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
      handler: () => {
        this.eliminarNuevaCategoria();
      }
    },
    {
      text: 'Crear',
      role: 'new',
      data: {
        action: 'share',
      },
      handler: () => {
        this.crearNuevaCategoria();
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  public subCategoriasActions = [
    {
      text: 'Eliminar',
      role: 'delete',
      data: {
        action: 'delete',
      },
      handler: () => {
        this.eliminarNuevaSubCategoria();
      }
    },
    {
      text: 'Crear',
      role: 'new',
      data: {
        action: 'share',
      },
      handler: () => {
        this.crearNuevaSubCategoria();
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(
    private fb: FormBuilder,
    private truequeSrv: TruequeService,
    private fotosService: FotosService,
    private alertController: AlertController,
    private smsSrv: MensajesService,
    private modalCtrl: ModalController,
    private platform: Platform
  ) { 
    this.FORM = this.createForm();

    const logDeviceInfo = async () => {
      const info = await Device.getInfo();
      const id = await Device.getId();
      const data = { info, id}
      return data;
    };
    logDeviceInfo().then( (res: any) => {
      this.DATA_DEVICE = res;
      console.log(this.DATA_DEVICE);
    })
  }

  ngOnInit() {
    this.getCategoria();

  }


  getCategoria() {
    this.truequeSrv.getGrupoElementos()
    .subscribe( (res : GrupoElementoInterface) => {
      this.CATEGORIAS = res.data ;
    })
  }

  private createForm(){
    return this.fb.group({
      nombre_servicio           : [ '' , [ Validators.required, Validators.maxLength(100) ] ],
      descripcion_servicio      : [ '' , [ Validators.required, Validators.maxLength(256) ] ],
      categoria                 : [ '' , [ Validators.required ] ],
      subcategorias              : this.fb.array([]),
      nueva_categoria           : [ '' ],
      nueva_subcategoria        : [ '' ],
    });
  }

  async tomarFoto() {
    await this.fotosService.agregarFoto();
    this.fotos = this.fotosService.fotos;
  }


  save() {

    this.smsSrv.openLoading();

    this.truequeSrv.getNextId()
    .subscribe( (res: any) => {
      
      var idCurrent = res.data[0][""];
      idCurrent = idCurrent.toString().padStart(7, '0');
      
      this.truequeSrv.getPar()
      .subscribe( (res: any) => {

        const parData = res.data[0];
        idCurrent = parData.A29_PRE+idCurrent;

        var productData = new URLSearchParams();
        productData.append("codigo", idCurrent);
        productData.append("unidad", "U");
        productData.append("nombre", this.FORM.get('nombre_servicio')?.value );
        productData.append("usuario", "FE-0000001");
        productData.append("descripcion", this.FORM.get('descripcion_servicio')?.value);
        productData.append("agrextra", this.FORM.get('categoria')?.value);

        this.truequeSrv.postProduct(productData)
        .subscribe( (response: any) =>  {

          if ( response.success ) {
            this._sendFotos(idCurrent)
            this.smsSrv.closeLoading();
            this.smsSrv.openSuccess( response.message )
            this.clearNewForm();
          }

        })
      })
    })
  }

  _sendFotos(id: number){
    var data = new URLSearchParams();    
    var m = 1;
    this.fotos.map((f)=>{

      data.append('codigo', id.toString());
      data.append('consecutivo', m.toString());
      data.append('imagen', f.toString());
      this.truequeSrv.postStoreImage(data)
      .subscribe( (res: any) => {
        console.log(res)
      },
      (error) => { alert(error)}
      );
      m++;
    });

  }
  
  selectCategoryPrincipal($event:any) {
    var selectedCategory = $event.detail.value;
    if(selectedCategory){
      let GRUPO_ELEMENTOS_CURRENT = selectedCategory;
      this.SUB_CATEGORIAS = this.CATEGORIAS;

      this.SUB_CATEGORIAS = this.SUB_CATEGORIAS.filter(category => category.COD_NIVEL !== GRUPO_ELEMENTOS_CURRENT);
    }
  }

  async crearNuevaCategoria() {
    const alert = await this.alertController.create({
      header: 'Ingresar Nueva Categoria',
      inputs: [
        {
          name: 'nueva_categoria',
          type: 'text',
          placeholder: 'Maximo 40 caracteres...'
        },
      ],
      buttons: [
        {
          text: 'Crear',
          cssClass: 'primary',
          handler: (data) => {
            this.setnewCategoriaForm(data);
          }
        }
      ]
    });
  
    await alert.present();
  }

  setnewCategoriaForm(data: any) {
    this.FORM.get('nueva_categoria')?.setValue(data.nueva_categoria);
    this.FORM.get('nueva_categoria')?.updateValueAndValidity();

  }

  eliminarNuevaCategoria() {
    this.FORM.get('nueva_categoria')?.setValue("");
    this.FORM.get('nueva_categoria')?.updateValueAndValidity(); 
  }


  async crearNuevaSubCategoria() {
    const alert = await this.alertController.create({
      header: 'Ingresar Nueva SubCategoria',
      inputs: [
        {
          name: 'nueva_subcategoria',
          type: 'text',
          placeholder: 'Maximo 40 caracteres...'
        },
      ],
      buttons: [
        {
          text: 'Crear',
          cssClass: 'primary',
          handler: (data) => {
            this.setnewSubCategoriaForm(data);
          }
        }
      ]
    });
  
    await alert.present();

  }

  setnewSubCategoriaForm(data: any) {
    this.FORM.get('nueva_subcategoria')?.setValue(data.nueva_subcategoria);
    this.FORM.get('nueva_subcategoria')?.updateValueAndValidity();

  }

  eliminarNuevaSubCategoria() {
    this.FORM.get('nueva_subcategoria')?.setValue("");
    this.FORM.get('nueva_subcategoria')?.updateValueAndValidity(); 
  }

  async clearNewForm() {
    this.FORM.reset();
    this.fotosService.fotos = [];
    this.fotos = [];
  }

  async openModalSubcategoria() {
    const modal = await this.modalCtrl.create({
      component: ModalSubcategoriaComponent,
      backdropDismiss: false,
      componentProps: {
        SUBCATEGORIAS: this.SUB_CATEGORIAS,
        form : this.FORM
      } 
    });

    modal.onDidDismiss().then( (data: any) => {

      const subcategorias = this.FORM.get('subcategorias') as FormArray;
      const subcategoriasSeleccionadas = subcategorias.controls.filter(control => control.value.SEL_NIVEL);
      this.SELECT_SUB = subcategoriasSeleccionadas.length;

    });

    modal.present();

  }


  eliminarFoto(index: number): void {
    if (index >= 0 && index < this.fotos.length) {
      this.fotos.splice(index, 1);
    }
  }

}
