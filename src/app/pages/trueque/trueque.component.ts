import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { GrupoElementoDTO, DataGrupoElementosDTO } from 'src/app/interface/grupo-elemento-interface';
import { FotosService } from 'src/app/servicios/fotos.service';
import { MensajesService } from 'src/app/servicios/mensajes/mensajes.service';
import { TruequeService } from 'src/app/servicios/trueque/trueque.service';

import { ModalSubcategoriaComponent } from './modal-subcategoria/modal-subcategoria.component';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UserInfoData } from 'src/app/interface/user-info-interface';
import { EMPTY, catchError, concatMap, from, lastValueFrom, map, of, throwError, toArray } from 'rxjs';
import { responseAPIDTO } from 'src/app/interface/response-interface';
import { SheetErrorComponent } from '../shared/sheet-error/sheet-error.component';
import { NuevoTruequeInterface } from 'src/app/interface/nuevo-trueque-interface';
import Swiper from 'swiper';
import { ModalImagesErrorComponent } from './modal-images-error/modal-images-error.component';


@Component({
  selector: 'app-trueque',
  templateUrl: './trueque.component.html',
  styleUrls: ['./trueque.component.scss'],
})
export class TruequeComponent  implements OnInit {

  FORM: FormGroup;
  
  CATEGORIAS!: DataGrupoElementosDTO[] | undefined
  SUB_CATEGORIAS! : DataGrupoElementosDTO[] | undefined
  fotos: string[] = [];

  SELECT_SUB: number = 0
  INFO_USER: UserInfoData | null;
  mySwiper!: Swiper;


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
    private authSrv: AuthService,
  
  ) { 
    this.INFO_USER = this.authSrv.getInfoUserLocalStorage();
    this.FORM = this.createForm();
    this.initSwipper();
  }

  ngOnInit() {
    this.getCategoria();

  }


  getCategoria() {
    this.truequeSrv.getGrupoElementos()
    .subscribe( (res : GrupoElementoDTO) => {
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
      usuario                   : [ this.INFO_USER?.COD_CLIE],
      codigo                    : [ '' ],
      tipotrueque               : [ '' ]  // 2.03.260
    });
  }

  async tomarFoto() {
    await this.fotosService.agregarFoto();
    this.fotos = this.fotosService.fotos;
    
    this.initSwipper();
  }


  saveBack() {

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
        productData.append("usuario", this.FORM.get('usuario')?.value);
        productData.append("descripcion", this.FORM.get('descripcion_servicio')?.value);
        productData.append("agrextra", this.FORM.get('categoria')?.value);
        productData.append("tipotrueque", this.FORM.get('tipotrueque')?.value);  // 2.03.260

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

  async save() {
    this.smsSrv.openLoading();

    this.truequeSrv.getNextId()
    .pipe(
      concatMap( (res: any) => {
        var idCurrent = res.data[0][""];
        idCurrent = idCurrent.toString().padStart(7, '0');
        return of(idCurrent)
      }),
      concatMap( (res: any) => {
        return this.truequeSrv.getPar()
        .pipe(  
          map((pair: any) => {
            const parData = pair.data[0];
            res = parData.A29_PRE+res;
            return res;
          })
        );
      }),
      concatMap( (res: string) => {

        var productData = new URLSearchParams();
        this.FORM.get("codigo")?.setValue(res.toString())

        productData.append("codigo", res.toString());
        productData.append("unidad", "U");
        productData.append("nombre", this.FORM.get('nombre_servicio')?.value );
        productData.append("usuario", this.FORM.get('usuario')?.value);
        productData.append("descripcion", this.FORM.get('descripcion_servicio')?.value);
        productData.append("agrextra", this.FORM.get('categoria')?.value);
        productData.append("tipotrueque",this.FORM.get('tipotrueque')?.value);  // 2.03.260
        
        return this.truequeSrv.postProduct(productData)
        .pipe(
          catchError( (error: any) => {
            const newError : NuevoTruequeInterface = error.error;
            if (! newError.code) {
              const errorUnknow: NuevoTruequeInterface = {
                message: `::ERROR AL REALIZAR LA PETICIÓN::`,
                success: false,
                name: `BAD REQUEST`,
                code: "400.1"
              }
              return of(errorUnknow)
            }
            return of(newError)
          })
        )
      }),
      // 2.03.259
/*     concatMap( (res: string) => {

        var productNivelData = new URLSearchParams();
        this.FORM.get("codigo")?.setValue(res.toString())

        productNivelData.append("nivel", this.FORM.get('categoria')?.value);
        productNivelData.append("codigo", res.toString());
        productNivelData.append("codbase", "XA29");
        
        return this.truequeSrv.postProductNivel(productNivelData)
        .pipe(
          catchError( (error: any) => {
            const newError : NuevoTruequeInterface = error.error;
            if (! newError.code) {
              const errorUnknow: NuevoTruequeInterface = {
                message: `::ERROR AL REALIZAR LA PETICIÓN::`,
                success: false,
                name: `BAD REQUEST`,
                code: "400.1"
              }
              return of(errorUnknow)
            }
            return of(newError)
          })
        )
      }),  */

      concatMap( (res: NuevoTruequeInterface) => {
        
        if ( !res.success ) {
          this.openSheetError(res.message)
          return of([res])
        } else {

          if ( this.fotos.length === 0) {
            return of([res]);
          }

          return from(this.fotos).pipe(
            concatMap((foto, index) => {
              const data = new URLSearchParams();
              data.append('codigo', this.FORM.get('codigo')?.value);
              data.append('consecutivo', (index + 1).toString());
              data.append('imagen', foto.toString());

              return this.truequeSrv.postStoreImage(data).pipe(
                concatMap( (imageUpload) => {
                  this.fotos.splice(index, 1)
                  this.initSwipper();
                  return of(imageUpload)
                }),
                catchError((error: any) => {
                  const newErrorImage: NuevoTruequeInterface = error.error;
                  return of(newErrorImage);
                })
              );
            }),
            catchError( () => {  return EMPTY }),
            toArray(),
            map( response => response )
          )
        }
      }), 
    ).subscribe( (res: NuevoTruequeInterface[] ) =>  {
      const temp = res.find(res => !res.success);
      if ( temp && !temp.success ) {
        this.openModalImagesError({});
      } else {
        this.smsSrv.openSuccess( temp?.message ?? `Producto creado!` )
        this.clearNewForm();
      }
      this.smsSrv.closeLoading();
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
      this.SUB_CATEGORIAS = this.SUB_CATEGORIAS?.filter(category => category.COD_NIVEL !== GRUPO_ELEMENTOS_CURRENT);
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
      this.initSwipper();
    }
  }

  async openSheetError(error: string) {

    const modal = await this.modalCtrl.create({
      component: SheetErrorComponent,
      backdropDismiss: false,
      initialBreakpoint : 0.50,
      breakpoints: [0, 0.25, 0.5, 0.75],
      handleBehavior: `cycle`,
      componentProps: {
        error
      } 
    });

    modal.onDidDismiss()
    .then( (data: any) => {
      if ( data.role === `gesture` )
        return false;

      if (data.data)
        this.save();

        return true;
    })
    
    modal.present();

  }

  initSwipper() {
    this.mySwiper = new Swiper('swiper-container', {
      slidesPerView: 1,
      cssMode: true,
      navigation: true,
      pagination: true
    })
  }

  async openModalImagesError(data: any) {

    const modal = await this.modalCtrl.create({
      component: ModalImagesErrorComponent,
      backdropDismiss: false,
      componentProps: { data, fotos: this.fotos }
    });

    modal.onDidDismiss()
    .then( (data: any) => {
      if ( data.data ) {
        this.smsSrv.openLoading();
        this.reprocesImages().subscribe({
          next: (res: any) => {
            this.smsSrv.closeLoading();
            this.smsSrv.openSuccess(`Imagenes cargada correctamente` )
            this.clearNewForm();
          },
          error: (error: any) => {
            this.smsSrv.closeLoading();
            this.smsSrv.openError(`ERROR al procesar Imagenes` )
            this.clearNewForm();
          }
        })
      } else {
        this.clearNewForm();
      }
    })

    modal.present();
  }

  reprocesImages() {

    return from(this.fotos).pipe(
      concatMap((foto, index) => {
        const data = new URLSearchParams();
        data.append('codigo', this.FORM.get('codigo')?.value);
        data.append('consecutivo', (index + 1).toString());
        data.append('imagen', foto.toString());

        return this.truequeSrv.postStoreImage(data).pipe(
          concatMap( (imageUpload) => {
            this.fotos.splice(index, 1)
            this.initSwipper();
            return of(imageUpload)
          }),
          catchError((error: any) => {
            const newErrorImage: NuevoTruequeInterface = error.error;
            return of(newErrorImage);
          })
        );
      }),
      catchError( () => {  return EMPTY }),
      toArray(),
      map( response => response )
    )
  }
}
