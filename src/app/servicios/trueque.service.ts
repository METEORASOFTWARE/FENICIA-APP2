import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TruequeService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sharedService:SharedService
  ) { }

  private apiUrl = 'http://fenicia.meteoracolombia.co:8010/4p1';

  getTrueque(): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+token,
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http.get(`${this.apiUrl}/GrupoElementosController.php`,{headers}).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  getNextId(): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+token,
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http.get(`${this.apiUrl}/ProxPTController.php`,{headers}).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  getPar(): Observable<any> {
    var token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+token,
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http.get(`${this.apiUrl}/ParFeniciaController.php`,{headers}).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  createProduct(data:URLSearchParams): Observable<any> {
    var token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      "Authorization": "Bearer "+token,
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http.post(`${this.apiUrl}/ProductController.php`,data, {headers}).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }

  storeImage(data:FormData): Observable<any> {
    var token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      "Authorization": "Bearer "+token,
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http.post(`${this.apiUrl}/ImageProductController.php`,data, {headers}).pipe(
      catchError(this.sharedService.handleErrorResponse)
    );
  }
  
}
