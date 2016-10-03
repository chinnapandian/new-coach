import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/message-board/compose/compose.html'
})

export class ComposePage {

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
