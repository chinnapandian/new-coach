import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectStatePage} from '../select-state/select-state';


@Component({
  templateUrl: 'build/pages/add-team/select-gender/select-gender.html'
})
export class SelectGenderPage {

  private gameSegment: string = 'edit';

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToStatePage(){
    this.navCtrl.push(SelectStatePage);
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
