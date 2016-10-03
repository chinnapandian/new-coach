import {Component} from '@angular/core';
import {ViewController, ModalController} from 'ionic-angular';
// import {SelectTeamPage} from './select-team/select-team';
import {GamePage} from './game/game';
import {TournamentDetailsPage} from './details/details';

@Component({
  templateUrl: 'build/pages/tournament/tournament.html'
})
export class TournamentPage {
  private tournamentViewSegment: string = 'schedule';

  private games: any = [
    {
      team2: 'Utah Jazz',
      team2Coach: 'MIke Wilks',
      team1: 'Boston Celtics',
      team1Coach: 'Tim Filborbn',
      team1Score: '34',
      team2Score: '67',
      dateStamp: 'Monday, July 12, 2016',
      timeStamp: '8:00 AM'
    },{
      team2: 'Miami Heat',
      team2Coach: 'JOhnny Danny',
      team1: 'Boston Celtics',
      team1Coach: 'Frank Underwood',
      team1Score: '89',
      team2Score: '99',
      dateStamp: 'Monday, July 12, 2016',
      timeStamp: '12:30 PM'
    }
  ];

  constructor(
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  // goToSelectTeamPage() {
  //   let selectTeamModal = this.modalCtrl.create(SelectTeamPage);
  //   selectTeamModal.present();
  // };

  goToGamePage() {
    let gameModal = this.modalCtrl.create(GamePage);
    gameModal.present();
  };

  goToDetailsPage() {
    let detailsModal = this.modalCtrl.create(TournamentDetailsPage);
    detailsModal.present();
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
