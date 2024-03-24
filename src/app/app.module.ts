import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BtruequeComponent } from './pages/btrueque/btrueque.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ModalDetalleGrupoElementoComponent } from './pages/btrueque/modal-detalle-grupo-elemento/modal-detalle-grupo-elemento.component';
import { TruequeComponent } from './pages/trueque/trueque.component';

import { ErrorInterceptor } from './interceptor/error.interceptor';
// am
import { MisofertasComponent } from './pages/misofertas/misofertas.component';
import { PropuestaComponent } from './pages/propuesta/propuesta.component';
import { ModalSubcategoriaComponent } from './pages/trueque/modal-subcategoria/modal-subcategoria.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { SharedModule } from './pages/shared/shared.module';
import { ModalImagesErrorComponent } from './pages/trueque/modal-images-error/modal-images-error.component';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    ComunidadComponent,
    TruequeComponent,
    BtruequeComponent,
    ModalDetalleGrupoElementoComponent,
    MisofertasComponent,
    PropuestaComponent,
    ModalSubcategoriaComponent,
    ModalImagesErrorComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ServiceWorkerModule.register('ngsw-worker.js', 
    { 
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    SharedModule
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy,
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, multi: true 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
