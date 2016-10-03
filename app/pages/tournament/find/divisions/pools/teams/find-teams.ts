import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {TournamentPage} from '../../../../tournament'

@Component({
  templateUrl: 'build/pages/tournament/find/divisions/pools/teams/find-teams.html'
})
export class FindTournamentTeamsPage {

  private teams: any = [
    {
      name: 'Spartans Boys 12U'
    },{
      name: 'Mass Elite Boys'
    },{
      name: 'Red River Rockets'
    },{
      name: 'Mountain Silver Boys'
    },{
      name: 'NH Boys 12U Warriors'
    }
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  goToTournamentPoolPage(){
    this.navCtrl.push(TournamentPage)
  }

}
