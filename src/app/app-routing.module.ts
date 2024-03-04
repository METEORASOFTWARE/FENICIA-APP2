import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';

import { BtruequeComponent } from './pages/btrueque/btrueque.component';
import { TruequeComponent } from './pages/trueque/trueque.component';
// am
import { MisofertasComponent } from './pages/misofertas/misofertas.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'comunidad',
    component: ComunidadComponent
  },
  {
    path: 'trueque',
    component: TruequeComponent
  },
  {
    path: 'btrueque',
    component: BtruequeComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
