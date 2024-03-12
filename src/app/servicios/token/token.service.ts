import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EnvtokenService } from '../env/envtoken.service';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenInterface } from 'src/app/interface/token-interface';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private envSrv: EnvtokenService,
    private http: HttpClient,
  ) { 
    
  }

  public generateToken() {

    const data = new URLSearchParams();
		data.set('username', environment.token.username);
		data.set('password', environment.token.password);
		data.set('grant_type', environment.token.grant_type);
		data.set('client_id', environment.token.client_id);

    this.envSrv.postQuery('', data.toString())
    .subscribe( (res: TokenInterface) => {
      localStorage.setItem('token', res.access_token);
    })

  }
}
