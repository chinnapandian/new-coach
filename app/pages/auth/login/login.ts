import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {SignUpPage} from '../signup/signup';
import {TeamsPage} from "../../teams/teams";

@Component({
  templateUrl: 'build/pages/auth/login/login.html'
})
export class LoginPage {

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) {
  }

  goToSignUpPage(){
    let signUpPageModal = this.modalCtrl.create(SignUpPage);
    signUpPageModal.present();
  }

  login(){
    this.navCtrl.push(TeamsPage);
  }


}
