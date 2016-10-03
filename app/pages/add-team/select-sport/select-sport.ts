import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {AddTeamPage} from '../add-team';

@Component({
  templateUrl: 'build/pages/add-team/select-sport/select-sport.html'
})
export class SelectSportPage {

  private gameSegment: string = 'edit';

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToAddTeamPage(){
    this.navCtrl.push(AddTeamPage);
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
