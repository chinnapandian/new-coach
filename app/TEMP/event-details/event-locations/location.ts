import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tournament/details/location/location.html'
})
export class TournamentLocationPage {

  private facilityFilter: string = 'rim';
  private dateFilter: string = 'all-days';
  private timeFilter: string = 'all-time-slots';

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
