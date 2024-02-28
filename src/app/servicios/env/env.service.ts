import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUlr = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  constructor(
    private http: HttpClient
  ) { }

  public getQuery<T>(query: string) {
    query = apiUlr + query;
    return this.http.get<T>(query).pipe(map((data: any) => data));
  }

  public postQuery<T>(query: string, form: any) {
    query = apiUlr + query;
    return this.http.post<T>(query, form).pipe(map((data: any) => data));
  }  

  public putQuery<T>(query: string, form: any) {

    query = apiUlr + query;
    return this.http.put<T>(query, form).pipe(map((data: any) => data));
  }

  public deleteQuery<T>(query: string) {

    query = apiUlr + query;
    return this.http.delete<T>(query).pipe(map((data: any) => data));
  }  
}
