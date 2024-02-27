import { NgModule, isDevMode } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    ComunidadComponent,
    TruequeComponent,
    BtruequeComponent,
    ModalDetalleGrupoElementoComponent
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
    ReactiveFormsModule
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
