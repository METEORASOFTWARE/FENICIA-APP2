import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../servicios/token/token.service';
import { TokenInterface } from '../interface/token-interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private tokenSrv: TokenService,
  ) {
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(  
      catchError((error: HttpErrorResponse) => {
        if ( error.status === 401 ) {
          console.log('401 Unauthorized')
          return this.tokenSrv.generateToken()
          .pipe(
            switchMap( (res: TokenInterface) => {
              this.tokenSrv.removeTokenLocalStorage();
              const newtoken = res.access_token;
              this.tokenSrv.setTokenLocalStorage(res)
    
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newtoken}`,
                },
              });
              return next.handle(request);
            })
          );
        }
        return throwError(error)
      })
    )
  }
}
