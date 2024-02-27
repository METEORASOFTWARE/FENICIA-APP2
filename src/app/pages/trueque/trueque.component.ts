import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataGrupoElementos, GrupoElementoInterface } from 'src/app/interface/grupo-elemento-interface';
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

  constructor(
    private fb: FormBuilder,
    private truequeSrv: TruequeService,
  ) { 
    this.FORM = this.createForm();
  }

  ngOnInit() {
    this.getCategoria();
  }

  getCategoria() {
    this.truequeSrv.getGrupoElementos()
    .subscribe( (res : GrupoElementoInterface) => {
      this.GRUPO_ELEMENTOS = res.data ;
      this.CATEGORIAS = res.data ;

      this.CATEGORIAS.forEach(category => category.SELECTED = false);

    })
  }

  private createForm(){
    return this.fb.group({
      nombre_servicio           : [ '' ],
      descripcion_servicio      : [ '' ],
      categoria                 : [ ''],
    });
  }

  
  selectCategoryPrincipal($event:any):void{
    var selectedCategory = $event.detail.value; // Aquí obtienes el valor de la categoría seleccionada
    
    if(selectedCategory){
      let GRUPO_ELEMENTOS_CURRENT = selectedCategory.COD_NIVEL;
      this.CATEGORIAS = this.GRUPO_ELEMENTOS;

      this.CATEGORIAS = this.CATEGORIAS.filter(category => category.COD_NIVEL !== GRUPO_ELEMENTOS_CURRENT);
    }
  }

}
