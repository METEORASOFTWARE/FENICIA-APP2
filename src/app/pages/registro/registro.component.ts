import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {

  DATA_DEVICE = { info : { model: null, osVersion: null, platform: null}, id : { identifier : null }};

  constructor() { 
    const logDeviceInfo:any = async () => {
      const info = await Device.getInfo();
      const id = await Device.getId();
      const data = { info, id}
      return data;
    };
    logDeviceInfo().then( (res: any) => {
      this.DATA_DEVICE = res;
      console.log(this.DATA_DEVICE);
    })
  }

  ngOnInit() {}

}
