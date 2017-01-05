import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/main/events/event/game-details/game-details.html'
})

export class GameDetailsPage {

  private matchup:any = [
    {
      team2: 'BGCN Pride 10',
      team2Coach: 'R. Pierce',
      team2Rec: '(3 - 0)',
      team1: 'Spartans Boys 12U',
      team1Coach: 'F. Underwood',
      team1Rec: '(3 - 1)',
      team1Score: '',
      team2Score: '',
      dateStamp: 'Sun 10/20',
      timeStamp: '12:30 PM',
      facility: 'Madison Square Garden',
      court: '5'
    }
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  dismiss() {
     localStorage.setItem("TabIndex",'1');
    this.viewCtrl.dismiss();
  }
}
