import { Component, OnInit } from '@angular/core';
import { TokenService } from './servicios/token/token.service';
import { register } from 'swiper/element/bundle';
import { environment } from 'src/environments/environment';
import { MenuService } from './servicios/menu/menu.service';
import { DeviceInfoService } from './servicios/device-info/device-info.service';
import { map } from 'rxjs';
import { AuthService } from './servicios/auth/auth.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  versionFenicia = environment.versionFenicia
  MENU : any = ''
  
  constructor(
    private tokenSrv: TokenService,
    private menuSrv: MenuService,
    private deviceSrv : DeviceInfoService,
    private authSrv: AuthService

  ) {

    this.tokenSrv.generateToken();
    
  }

  ngOnInit() {

    var _uuid_device = localStorage.getItem('_uuid_device');

    // 66943667-5fa2-46d4-bbd1-771e590f1224
    this.authSrv.getInfoUser(_uuid_device).subscribe(
      (res: any) => {
        localStorage.setItem(`_infoUser`, JSON.stringify(res.data[0]));
        this.getMenu();
      }, (error: any) => {
        localStorage.removeItem('_infoUser');
        this.getMenu();
      }
    )
  }


  async getMenu() {

    const _infoUser = localStorage.getItem('_infoUser');

    this.menuSrv.get().subscribe( (res: any) => {

      const menuUpdated = res.map( (item: any )=> {
        var disabled = item.disabled;

        if (!_infoUser && item.check_user) {
          disabled = true;
        }
        return { ...item, disabled : disabled }
      })

      this.MENU = menuUpdated;
    })


  }
}
