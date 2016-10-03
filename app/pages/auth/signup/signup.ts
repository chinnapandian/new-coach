import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/auth/signup/signup.html'
})
export class SignUpPage {
  
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController) {
  
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
