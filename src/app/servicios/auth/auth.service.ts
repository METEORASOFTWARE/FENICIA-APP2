import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';
import { UserInfoData, UserInfoInterface } from 'src/app/interface/user-info-interface';
import { Observable } from 'rxjs';

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

  public setInfoUserLocalStorage(info: UserInfoData) {
    localStorage.setItem(`_info_user`, JSON.stringify(info));
  }

  public getInfoUserLocalStorage(): UserInfoData | null  {

    const _info_user: string | null = localStorage.getItem('_info_user');
    if (_info_user !== null)
      return JSON.parse(_info_user);
    else 
      return null;
  }
}
