import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrlJSON = 'assets/data/labels.json';

  constructor(
    private envSrv : EnvService,
    private httpClient: HttpClient
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

  getLabel(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrlJSON);
  }

}
