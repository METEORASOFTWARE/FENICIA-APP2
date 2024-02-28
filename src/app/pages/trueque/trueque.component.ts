import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataGrupoElementos, GrupoElementoInterface } from 'src/app/interface/grupo-elemento-interface';
import { FotosService } from 'src/app/servicios/fotos.service';
import { MensajesService } from 'src/app/servicios/mensajes/mensajes.service';
import { TruequeService } from 'src/app/servicios/trueque/trueque.service';

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
    private smsSrv: MensajesService
  ) { 
    this.FORM = this.createForm();
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
      subcategoria              : [ '' ],
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
      this.truequeSrv.postStoreImage(data).subscribe();
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




}
