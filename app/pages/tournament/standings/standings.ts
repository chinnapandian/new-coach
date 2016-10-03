import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tournament/standings/standings.html'
})

export class TournamentStandingsPage {

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
