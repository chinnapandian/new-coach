import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {MainTabs} from "../../../main/tabs/main-tabs";


@Component({
  templateUrl: 'build/pages/auth/signup/get-email/get-email.html'
})
export class GetEmailPage {
  
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController) {
  
  }

  goToMyTeamsPage(){
    this.navCtrl.setRoot(MainTabs);
  }

}
