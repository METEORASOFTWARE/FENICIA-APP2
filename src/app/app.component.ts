import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from './servicios/token/token.service';
import { register } from 'swiper/element/bundle';
import { environment } from 'src/environments/environment';
import { MenuService } from './servicios/menu/menu.service';
import { DeviceInfoService } from './servicios/device-info/device-info.service';
import { Subscription, catchError, concatMap, forkJoin, map, of } from 'rxjs';
import { AuthService } from './servicios/auth/auth.service';
import { AccesoService } from './servicios/acceso/acceso.service';
import { TokenInterface } from './interface/token-interface';
import { DeviceInfoPWA } from './interface/device-info';
import { UserInfoInterface } from './interface/user-info-interface';
import { AccesoInterface } from './interface/acceso-interface';
import { responseAPIDTO } from './interface/response-interface';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy  {

  versionFenicia = environment.versionFenicia
  MENU : any = ''
  menuRebuildSubscription: Subscription;

  constructor(
    private tokenSrv: TokenService,
    private menuSrv: MenuService,
    private deviceSrv : DeviceInfoService,
    private authSrv: AuthService,
    private accesoSrv: AccesoService

  ) {

    this.menuRebuildSubscription = this.menuSrv.menuRebuild.subscribe((res: any) => {
      if (res)
        this.setMenu(res);
    });

    this.tokenSrv.generateToken()
    .pipe(
      concatMap( (token: TokenInterface) =>  {
        this.tokenSrv.setTokenLocalStorage(token);
        return deviceSrv.getInfoDevice()
      }),
      concatMap( (device: DeviceInfoPWA)=> {

        const devicetmp = this.deviceSrv.getInfoDeviceLocalStorage();
        if (!devicetmp)
          this.deviceSrv.setInfoDeviceLocalStorage(device)
        else
          device = devicetmp;

        return this.authSrv.getInfoUser(device._uuid_device)
        .pipe(
          catchError( (error: responseAPIDTO) => {
            this.authSrv.removeInfoUserLocalStorage();
            return of(null)
          })
        );
      }),
      concatMap( (user : UserInfoInterface | null) => {
        var data = new URLSearchParams();
        const device = this.deviceSrv.getInfoDeviceLocalStorage()
        data.append("pwaid", device?._uuid_device.toString().trim() ?? "");
        data.append("ip", "localhost");
        
        if (user) {
          this.authSrv.setInfoUserLocalStorage(user.data[0])
          data.append("usuario", user.data[0].COD_CLIE);
        }else {
          data.append("usuario",``);
        }
        
        return accesoSrv.post(data);

      }),
      concatMap( (acceso: AccesoInterface)=> {
        return this.menuSrv.get();
      }),
    ).subscribe( res => {
      this.setMenu(res)
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.menuRebuildSubscription.unsubscribe();
  }

  async setMenu(res: any) {

    const infoUser = this.authSrv.getInfoUserLocalStorage();

    const menuUpdated = res.map( (item: any )=> {
      var disabled = item.disabled;

      if (!infoUser && item.check_user) {
        disabled = true;
      }
      return { ...item, disabled : disabled }
    })

    this.MENU = menuUpdated;
  }
}
