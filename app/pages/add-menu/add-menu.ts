import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectGenderPage} from '../add-team/select-gender/select-gender';


@Component({
  templateUrl: 'build/pages/add-menu/add-menu.html'
})
export class AddMenuPage {
  
  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToSelectGenderPage(){
    this.navCtrl.push(SelectGenderPage);
  }
  

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
