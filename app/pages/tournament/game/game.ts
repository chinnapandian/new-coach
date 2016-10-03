import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tournament/game/game.html'
})

export class GamePage {

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
