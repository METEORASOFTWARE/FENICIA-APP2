import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sheet-error',
  templateUrl: './sheet-error.component.html',
  styleUrls: ['./sheet-error.component.scss'],
})
export class SheetErrorComponent  implements OnInit {

  @Input() error: any;
  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  closeModal(flag: boolean) {
    this.modalCtrl.dismiss( flag, 'buttom' );
  }

}
