import {Component} from '@angular/core';
import {ViewController, ModalController, NavController} from 'ionic-angular';
import {AddPlayerPage} from '../add-player/add-player'
import {FilterTeamStatePage} from '../follow-teams/filter-state/filter-state'

@Component({
  templateUrl: 'build/pages/main/home/add-popover/add-popover.html'
})
  
export class AddPopoverPage {

  constructor(private viewCtrl: ViewController,
              private navCtrl: NavController,
              private modalCtrl:ModalController) {}

  goToAddPlayerPage(){
    this.navCtrl.setRoot(AddPlayerPage);
  }

  goToFilterTeamStatePage(){
    this.navCtrl.setRoot(FilterTeamStatePage);
  }

}
