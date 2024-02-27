import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDetalleGrupoElementoComponent } from './modal-detalle-grupo-elemento.component';

describe('ModalDetalleGrupoElementoComponent', () => {
  let component: ModalDetalleGrupoElementoComponent;
  let fixture: ComponentFixture<ModalDetalleGrupoElementoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleGrupoElementoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDetalleGrupoElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
