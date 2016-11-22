import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {MainTabs} from "../../main/tabs/main-tabs";

@Component({
  templateUrl: 'build/pages/auth/login/login.html'
})

export class LoginPage {

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) {
  }

  login(){
    this.navCtrl.setRoot(MainTabs);
  }


}
