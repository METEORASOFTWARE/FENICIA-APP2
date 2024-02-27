import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUlr = environment.token.api;

@Injectable({
  providedIn: 'root'
})
export class EnvtokenService {

  constructor(
    private http: HttpClient
  ) { }

  public postQuery<T>(query: string, form: any) {
    query = apiUlr + query;
    return this.http.post<T>(query, form).pipe(map((data: any) => data));
  } 
}
