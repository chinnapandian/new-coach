import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {TournamentPage} from '../tournament'

@Component({
  templateUrl: 'build/pages/tournament/select-team/select-team.html'
})
export class SelectTeamPage {

  private gameSegment: string = 'edit';

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToTournamentPage(){
    this.navCtrl.push(TournamentPage);
  }

  // goToTournamentPage() {
  //   this.navCtrl.pop();
  //
  //   let tournamentModal = this.modalCtrl.create(TournamentPage);
  //   tournamentModal.present();
  //
  // };

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
