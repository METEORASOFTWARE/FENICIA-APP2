import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrlJSON = 'assets/data/menu.json';

  constructor(
    private httpClient: HttpClient
  ) { }


  get(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrlJSON);
  }
}
