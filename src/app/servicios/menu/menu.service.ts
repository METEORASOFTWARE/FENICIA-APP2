import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrlJSON = 'assets/data/menu.json';
  public menuRebuildSubject = new BehaviorSubject<any>(null);
  public menuRebuild :Observable<any> = this.menuRebuildSubject.asObservable();


  constructor(
    private httpClient: HttpClient
  ) { 
  }


  get(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrlJSON);
  }

  rebuildMenu(): void {
    this.get().subscribe(
      data => {
        this.menuRebuildSubject.next(data);
      },
      error => {
        console.error('Error al reconstruir el menú:', error);
      }
    );
  }
}
