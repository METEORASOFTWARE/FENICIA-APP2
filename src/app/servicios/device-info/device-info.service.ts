import { Injectable } from '@angular/core';
import { Device, DeviceInfo } from '@capacitor/device';
import { DeviceInfoPWA } from 'src/app/interface/device-info';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

  constructor() {}

  async getInfoDevice() {

    const [info, id] = await  Promise.all([Device.getInfo(), Device.getId()]);

    const deviceInfo: DeviceInfoPWA = {
      isVirtual: info.isVirtual,
      manufacturer: info.manufacturer,
      model: info.model,
      operatingSystem: info.operatingSystem,
      osVersion: info.osVersion,
      platform: info.platform,
      webViewVersion: info.webViewVersion,
      _uuid_device: id.identifier
    }

    return deviceInfo;
  }

  public setInfoDeviceLocalStorage(info: DeviceInfoPWA) {
    localStorage.setItem(`_info_device`, JSON.stringify(info));
  }

  public removeInfoDeviceLocalStorage() {
    localStorage.removeItem('_info_device');
  }

  public getInfoDeviceLocalStorage(): DeviceInfoPWA | null  {

    const _info_device: string | null = localStorage.getItem('_info_device');
    if (_info_device !== null)
      return JSON.parse(_info_device);
    else 
      return null;
  }
}
