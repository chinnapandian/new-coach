import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {GetNamePage} from "../signup/get-name/get-name";

@Component({
  templateUrl: 'build/pages/auth/landing/landing.html'
})
export class LandingPage {

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) {
  }

  // goToGetNamePage(){
  //   let signUpPageModal = this.modalCtrl.create(GetNamePage);
  //   signUpPageModal.present();
  // }
  
  goToGetNamePage(){
    this.navCtrl.push(GetNamePage);
  }
  
  goToLoginPage(){
    this.navCtrl.push(LoginPage);
  }


}
