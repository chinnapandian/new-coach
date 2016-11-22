import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {AddPlayerAvatarPage} from "./add-avatar/add-avatar"
@Component({
  templateUrl: 'build/pages/selected-team/my-players/add-player/add-player.html'
})
export class AddPlayerPage {


  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }


  goToAddPlayerAvatarPage(){
    this.navCtrl.push(AddPlayerAvatarPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
