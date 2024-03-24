import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-images-error',
  templateUrl: './modal-images-error.component.html',
  styleUrls: ['./modal-images-error.component.scss'],
})
export class ModalImagesErrorComponent  implements OnInit {

  @Input() data: any;
  @Input() fotos: any;
  
  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  closeModal( flag: boolean) {
    this.modalCtrl.dismiss(flag);
  }

}
