import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/main/home/add-player/add-avatar/add-avatar.html'
})
export class AddPlayerAvatarPage {

  private avatarGender: string = 'boys';

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }
}
