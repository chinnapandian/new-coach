import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {TournamentDivisionPage} from './division/division'

@Component({
  templateUrl: 'build/pages/tournament/details/details.html'
})
export class TournamentDetailsPage {

  private description: string = 'Please remember all teams should have a light and dark colored jersey for every game. Entry fee for spectators will be $6. Team fees are $250 and must be paid before the start of the tournament.'
  
  
  private facilities: any = [
    {
      name: 'Oakdale'
    },{
      name: 'The Hive'
    },{
      name: 'Edmond Memorial HS'
    },{
      name: 'The Lighthouse'
    },{
      name: 'Above The RIM Sports Complex'
    }
  ];

  private divisions: any = [
    {
      name: 'Boys 8U'
    },{
      name: 'Boys 10U'
    },{
      name: 'Boys 11U'
    },{
      name: 'Boys 12U'
    },{
      name: 'Boys 14U'
    },{
      name: 'Boys Varsity'
    },{
      name: 'Girls 8U'
    },{
      name: 'Girls 10U'
    },{
      name: 'Girls 13U'
    },{
      name: 'Girls 15U'
    },{
      name: 'Girls Varsity'
    },{
      name: 'Girls Varsity Pro'
    }
  ];
  

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  goToTournamentDivisionPage(){
    this.navCtrl.push(TournamentDivisionPage)
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
