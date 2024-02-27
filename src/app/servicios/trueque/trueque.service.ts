import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';
import { environment } from 'src/environments/environment';
import { GrupoElementoInterface } from '../../interface/grupo-elemento-interface';

@Injectable({
  providedIn: 'root'
})
export class TruequeService {

  constructor(
    private envSrv : EnvService
  ) { }

  public getGrupoElementos() {
    return this.envSrv.getQuery<GrupoElementoInterface>(`GrupoElementosController.php`);
  }
  
  public getDetalleGrupoElementos(id: number) {
    return this.envSrv.getQuery<GrupoElementoInterface>(`ElementosPorGrupoController.php?AgrupacionExtra=${id}`);
  }
}
