import { Component, OnInit } from '@angular/core';
import { TokenService } from './servicios/token/token.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private tokenSrv: TokenService,

  ) {
    
  }

  ngOnInit() {
    
  }
}
