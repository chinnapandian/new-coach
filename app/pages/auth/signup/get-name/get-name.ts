import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {GetEmailPage} from "../get-email/get-email"

@Component({
  templateUrl: 'build/pages/auth/signup/get-name/get-name.html'
})
export class GetNamePage {
  
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController) {
  
  }

  goToGetEmailPage(){
    this.navCtrl.push(GetEmailPage);
  }


}
