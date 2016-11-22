import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {FilterTeamStatePage} from '../filter-state/filter-state';


@Component({
  templateUrl: 'build/pages/my-teams/follow-teams/filters/filter-gender/filter-gender.html'
})
export class FilterTeamGenderPage {
  
  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToFilterTeamStatePage(){
    this.navCtrl.push(FilterTeamStatePage);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
