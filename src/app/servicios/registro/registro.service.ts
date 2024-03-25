import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private envSrv : EnvService,
  ) { }

  public getNextId() {
    return this.envSrv.getQuery(`ProxCLController.php`)
  }

  public getPar() {
    return this.envSrv.getQuery(`ParFeniciaController.php`)
  }

  public post(data:URLSearchParams) {
    return this.envSrv.postQuery(`UsuarioController.php`, data)
  }

  public put(data:URLSearchParams) {
    return this.envSrv.putQuery(`UsuarioController.php`, data )
  }

}
