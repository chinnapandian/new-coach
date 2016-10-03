import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {FindTournamentTeamsPage} from './teams/find-teams'

@Component({
  templateUrl: 'build/pages/tournament/find/divisions/pools/find-pools.html'
})
export class FindTournamentPoolsPage {

  private pools: any = [
    {
      name: 'American Silver I'
    },{
      name: 'American Silver II'
    },{
      name: 'American Gold I'
    },{
      name: 'American Gold II'
    },{
      name: 'American Purple'
    },{
      name: 'American Brown'
    }
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  goToTournamentTeamsPage(){
    this.navCtrl.push(FindTournamentTeamsPage)
  }

}
