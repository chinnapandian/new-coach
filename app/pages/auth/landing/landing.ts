import {Component} from '@angular/core';
import {NavController, ModalController,App} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {GetNamePage} from "../signup/get-name/get-name";

@Component({
  templateUrl: 'build/pages/auth/landing/landing.html'
})

export class LandingPage {
private tabBarElement;
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
  //  this.navCtrl.setRoot(LoginPage);
     this.navCtrl.push(LoginPage);
  }


}
