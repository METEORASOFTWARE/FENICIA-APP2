import { Component } from '@angular/core';
import { TokenService } from './servicios/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private tokenSrv: TokenService
  ) {
    
  }
}
