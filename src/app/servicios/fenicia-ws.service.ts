import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeniciaWsService {

  constructor(
    public http: HttpClient
  ) { }
  ObtenerTipicas(): Promise <void>{
    return new Promise((resolve, reject) =>{
     console.log("MENSAJE: fenicia-ws.service");
     const httpOptions = {
       headers: new HttpHeaders({ 
         'Access-Control-Allow-Origin':'*',
       })
     }
     this.http.post('http://fenicia.meteoracolombia.co:8080/realms/meteora/protocol/openid-connect/token',{
       username:'wsm3t30r4.!2023',
       password:'zu@yCh@o$sL1N#&',
       grant_type: 'password',
       client_id: 'meteora_ws'
 
     },httpOptions).subscribe((Data: any) =>{
       resolve(Data)
     },err =>{
       reject(err)
      }
     )
    } )
   
     //return this.http.get('http://fenicia.meteoracolombia.co:8080/realms/meteora/protocol/openid-connect/token',);
   }
 
   obtenerServiceEjemplo(){
 
     const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJcjdQT1NuQmw0b3Z5WWNZQjNzUzZHVXFoSG5TWjdpR2xiVlB3YkM1VnYwIn0.eyJleHAiOjE3MDQ5MTEzMzYsImlhdCI6MTcwNDkxMDQzNiwianRpIjoiNTc2YmQ0MjUtZmRhOS00ZGQ5LWE2ZjEtN2I3OTFkOTJmN2M4IiwiaXNzIjoiaHR0cDovL2ZlbmljaWEubWV0ZW9yYWNvbG9tYmlhLmNvOjgwODAvcmVhbG1zL21ldGVvcmEiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiN2ZlY2I3NmItMTk4Yy00Zjc1LTgwMDMtYWFjMzRkYWFmYTUwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWV0ZW9yYV93cyIsInNlc3Npb25fc3RhdGUiOiIxMjMxNWEzZi01NDAyLTRjZjAtYTQ0Ny1kOGNiYmJkNzAzOTAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMC8qIiwiaHR0cDovL2xvY2FsaG9zdDo0MjAwLyIsImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLW1ldGVvcmEiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMTIzMTVhM2YtNTQwMi00Y2YwLWE0NDctZDhjYmJiZDcwMzkwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ3c20zdDMwcjQuITIwMjMiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIifQ.Peqc4lx2ILh7Tm0bGli8AxUEF6hJjYztgf_VAQ9yPnbN7FDD0Sz7s5GHlxPyxpHixxVEZfOlkrl5jJ4SJzcATJF5wEfW6kZphJUl7R69_CnLdb-uwJ9WTzuFzYQMqjeCtKrUKtrht36gydkBGiLK-AbIE8HHn2-zW6ot8XE6Bvhg6jTQG-0KeGbrWoj2eB-6LkfFW95LPzdWtpr10Z19YqfENFPl1hp5XLTXYxT2e0XQyg07V-WefcvwOpRfvIKnjvJDVVFib3dFwyRBGnkNlHISFLNnMUm-wOZ7Gx7ZUwAf6sSy6tqf1au8c6n2dxeG-2lWYt9WNPbIG_gGIiNrZg';
     const headers = new HttpHeaders({
       "Authorization": "Bearer "+token,
       "Content-Type": "application/x-www-form-urlencoded"
     });
 
     return this.http.get('http://fenicia.meteoracolombia.co:8010/4p1/GrupoElementosController.php',{headers});
   }
}
