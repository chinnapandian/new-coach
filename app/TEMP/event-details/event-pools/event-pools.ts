import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tournament/details/division/pool/pool.html'
})

export class TournamentPoolPage {

  private teams: any = [
    {
      name: 'Boston Celtics (MA)'
    },{
      name: 'Golden State Warriors (CA)'
    },{
      name: 'Oaklahoma City Thunder (OK)'
    },{
      name: 'Miami Heat (FL)'
    },{
      name: 'Houston Rockets (TX)'
    },{
      name: 'Utah Jazz (UT)'
    }
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }
  
}
