import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {TournamentPoolPage} from './pool/pool'

@Component({
  templateUrl: 'build/pages/tournament/details/division/division.html'
})
export class TournamentDivisionPage {

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

  goToTournamentPoolPage(){
    this.navCtrl.push(TournamentPoolPage)
  }

}
