import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {SelectComposeMessageTeamPage} from './select-team/select-team'

@Component({
  templateUrl: 'build/pages/main/message-board/compose/compose.html'
})

export class ComposeMessagePage {

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  goToSelectTeamPage(){
    this.navCtrl.push(SelectComposeMessageTeamPage)
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
