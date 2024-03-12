import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  UUID_DEVICE: any = '';
  INFO_USER: any = '';

  constructor() { 
    this.UUID_DEVICE = localStorage.getItem('_uuid_device');
    this.INFO_USER = localStorage.getItem('_infoUser');
  }

  ngOnInit() {
    this.INFO_USER = JSON.parse(this.INFO_USER);
  }

}
