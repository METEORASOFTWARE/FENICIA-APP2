import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

  DATA_DEVICE = { info : { model: null, osVersion: null, platform: null}, id : { identifier : null }};

  constructor() { 

    const _uuid_device = localStorage.getItem('_uuid_device');

    if (!_uuid_device) {
      this.getInfoDevice();
    }
  }

  async getInfoDevice() {
    const id = await Device.getId();

    localStorage.setItem('_uuid_device', id.identifier);
  }
}
