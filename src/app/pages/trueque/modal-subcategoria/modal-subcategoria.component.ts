import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-subcategoria',
  templateUrl: './modal-subcategoria.component.html',
  styleUrls: ['./modal-subcategoria.component.scss'],
})
export class ModalSubcategoriaComponent  implements OnInit {

  @Input() SUBCATEGORIAS: any;
  @Input() form: FormGroup | any;
  arraySubcategorias: FormArray | any;
  
  constructor(
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    ) {
    }
        
    ngOnInit() { 
      
      this.arraySubcategorias = this.form?.get('subcategorias') as FormArray;
      this.SUBCATEGORIAS.forEach((element: any) => {
        const existingGroup = this.arraySubcategorias.controls.find((control: any) => control.get('COD_NIVEL').value === element.COD_NIVEL);
        if (existingGroup) {
          existingGroup.get('SEL_NIVEL').setValue(  existingGroup.get('SEL_NIVEL').value );
        } else {
          this.arraySubcategorias.push(
            this.formBuilder.group({
              COD_NIVEL: element.COD_NIVEL,
              DESC_NIVEL: element.DESC_NIVEL,
              SEL_NIVEL:  element.SEL_NIVEL
            })
          );
        }
    });
  }

  hideModal() {
    this.modalCtrl.dismiss();
  }

  agregar() {
    console.log(this.form);
    this.hideModal();
  }

  setSelected(index : number) {
    const data = this.arraySubcategorias.controls[index] as FormGroup;
    const value = data.controls['SEL_NIVEL'].value;
    data.controls['SEL_NIVEL'].setValue( !value );
  }


}
