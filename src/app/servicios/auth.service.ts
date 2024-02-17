import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = false;
	token:string = '';

  constructor(
    private http: HttpClient,
		private router: Router,
		private sharedService:SharedService
  ) { }

  private _token(): Observable<any> {

		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded'
		});

		// Cuerpo de la solicitud
		const data = new URLSearchParams();
		data.set('username', 'wsm3t30r4.!2023');
		data.set('password', 'zu@yCh@o$sL1N#&');
		data.set('grant_type', 'password');
		data.set('client_id', 'meteora_ws');

		return this.http.post<any>(`http://fenicia.meteoracolombia.co:8080/realms/meteora/protocol/openid-connect/token`, data.toString(), { headers }).pipe(
			catchError(this.sharedService.handleErrorResponse)
		);
	}

  async generateToken(){

		return await this._token().subscribe(
			response => {
				this.logout();

				localStorage.setItem('token', response.access_token);
				localStorage.setItem('refresh_token', response.refresh_token);
				localStorage.setItem('session_state', response.session_state);
				return true;
			},
			error => {
			  console.error(error);
			  return false;
			}
		  );
	}

	isAuthenticatedUser(): boolean {

		const storedData = localStorage.getItem('token');
		return storedData !== null && storedData !== undefined;
	}

	logout(): void {
		//this.router.navigate(['/login']);
		this.isAuthenticated = false;
		localStorage.removeItem('token');
	}
  
}
