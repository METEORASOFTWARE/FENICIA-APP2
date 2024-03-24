import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { ImagesOfertasComponent } from './images-ofertas/images-ofertas.component';
import { SheetErrorComponent } from './sheet-error/sheet-error.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    ImagesOfertasComponent,
    SheetErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    IonicModule.forRoot(), 
  ],
  exports: [
    HeaderComponent,
    LoadingComponent,
    ImagesOfertasComponent,
    SheetErrorComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
