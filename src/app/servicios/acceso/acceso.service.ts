import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';
import { DeviceInfoService } from '../device-info/device-info.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  constructor(
    private envSrv : EnvService,
    private deviceSrv: DeviceInfoService,
    private userSrv: AuthService
  ) { }

  public post(data:URLSearchParams) {
    return this.envSrv.postQuery(`AccesoPWAController.php`, data)
  }

  public async acceso() {
    
    const device = await this.deviceSrv.getInfoDeviceLocalStorage();
    const user = await this.userSrv.getInfoUserLocalStorage();
    

    var data = new URLSearchParams();

    data.append("pwaid", device?._uuid_device.toString().trim() ?? "");
    data.append("ip", "186.154.36.35");
    data.append("usuario", user?.COD_CLIE.toString().trim() ?? "" );

    return this.post(data)
  }
}
