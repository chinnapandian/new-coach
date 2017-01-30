import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {ComposeMessagePage} from '../../compose/compose';
import {LoginService} from '../../../../../services/login';

@Component({
  templateUrl: 'build/pages/main/message-board/compose/select-team/select-team.html'
})

export class SelectComposeMessageTeamPage {
  private followedTeams = [];
  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private _loginService: LoginService) {
         this.followedTeams = this._loginService.getFollowedTeams();
          console.log(this.followedTeams);
  }
  
 dismiss() {    
    this.viewCtrl.dismiss();
  }

  goToComposeMessage(team) {
    this.navCtrl.push(ComposeMessagePage,
    {
      Team : team
    })
    
  }
}
