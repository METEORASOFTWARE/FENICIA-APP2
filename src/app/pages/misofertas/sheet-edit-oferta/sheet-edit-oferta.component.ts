import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataGrupoElementosDTO, GrupoElementoDTO } from 'src/app/interface/grupo-elemento-interface';
import { MisOfertasListaDTO } from 'src/app/interface/misOfertas-interface';
import { MensajesService } from 'src/app/servicios/mensajes/mensajes.service';
import { TruequeService } from 'src/app/servicios/trueque/trueque.service';

@Component({
  selector: 'app-sheet-edit-oferta',
  templateUrl: './sheet-edit-oferta.component.html',
  styleUrls: ['./sheet-edit-oferta.component.scss'],
})
export class SheetEditOfertaComponent  implements OnInit {

  FORM!: FormGroup;
  @Input() datos!: MisOfertasListaDTO;
  CATEGORIAS!: DataGrupoElementosDTO[] | undefined;

  constructor(
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    private truequeSrv: TruequeService,
    private smsSrv: MensajesService,
  ) { 
  }
  
  ngOnInit() {

    this.FORM = this.createForm();
    this.getCategoria();
  }

  private createForm(){
    return this.fb.group({
      nombre_servicio           : [ this.datos.NOM_PRODUCTO?.toString().trim() , [ Validators.required, Validators.maxLength(100) ] ],
      descripcion_servicio      : [ this.datos.DESC_GONDOLA?.toString().trim() , [ Validators.required, Validators.maxLength(256) ] ],
      categoria                 : [ this.datos.AGRUPACION_EXTRA , [ Validators.required ] ],
      codigo                    : [ this.datos.COD_PRODUCTO , [ Validators.required ] ],
    });
  }

  closeModal(flag: boolean) {
    this.modalCtrl.dismiss(flag)
  }

  
  getCategoria() {
    this.truequeSrv.getGrupoElementos()
    .subscribe( (res : GrupoElementoDTO) => {
      this.CATEGORIAS = res.data ;
    })
  }

  async update() {

    this.smsSrv.openLoading();

    var productData = new URLSearchParams();

    productData.append("codigo", this.FORM.get('codigo')?.value);
    productData.append("nombre", this.FORM.get('nombre_servicio')?.value );
    productData.append("descripcion", this.FORM.get('descripcion_servicio')?.value);
    productData.append("agrextra", this.FORM.get('categoria')?.value);

    this.truequeSrv.update(productData)
    .subscribe( {
      next: (res:any) => {
        this.smsSrv.closeLoading();
        this.smsSrv.openSuccess(res.message);
      },
      error: (error: any) => {
        this.smsSrv.closeLoading();
        this.smsSrv.openSuccess(error.message);
      }
    })

  }

}
