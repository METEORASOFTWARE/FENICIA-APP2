import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(
    private envSrv : EnvService,
  ) { }


  public get(user : string) {
    return this.envSrv.getQuery(`MisElementosController.php?propietario=${user}`)
  }
}
