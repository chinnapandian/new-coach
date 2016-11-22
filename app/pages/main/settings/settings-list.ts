import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
// import {SelectTeamPage} from '../tournament/select-team/select-team';


@Component({
  templateUrl: 'build/pages/main/settings/settings-list.html'
})

export class SettingsListPage {

  // Defining variable
  private tournamentView: string = 'ongoing';

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController) {
  
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // goToSelectTeamPage(){
  //   this.navCtrl.push(SelectTeamPage);
  // }

  // goToSelectTeamPage() {
  //   let selectTeamModal = this.modalCtrl.create(SelectTeamPage);
  //   selectTeamModal.present();
  // };

}
