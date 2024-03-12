import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private envSrv : EnvService,
  ) { }

  public getInfoUser(pwaID: any) {
    return this.envSrv.getQuery(`ClientesPWAController.php?PWAid=${pwaID}`)
  }
}
