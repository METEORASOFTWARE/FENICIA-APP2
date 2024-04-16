import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';
import { environment } from 'src/environments/environment';
import { GrupoElementoDTO } from '../../interface/grupo-elemento-interface';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class TruequeService {

  constructor(
    private envSrv : EnvService,
  ) { }

  public getGrupoElementos() {
    return this.envSrv.getQuery<GrupoElementoDTO>(`GrupoElementosController.php`);
  }
  
  public getDetalleGrupoElementos(id: number) {
    return this.envSrv.getQuery<GrupoElementoDTO>(`ElementosPorGrupoController.php?AgrupacionExtra=${id}`);
  }

  public getNextId() {
    return this.envSrv.getQuery(`ProxPTController.php`)
  }

  public getPar() {
    return this.envSrv.getQuery(`ParFeniciaController.php`)
  }

  public postProduct(data:URLSearchParams) {
    return this.envSrv.postQuery(`ProductController.php`, data)
  }

  // 2.03.259
  public postProductNivel(data:URLSearchParams) {
    return this.envSrv.postQuery(`ProductNivelController.php`, data)
  }

  public postStoreImage(data:any) {
    return this.envSrv.postQuery(`ImageProductController.php`, data)
  }

  public update(data:URLSearchParams) {
    return this.envSrv.putQuery(`ProductController.php`, data)
  }

}
