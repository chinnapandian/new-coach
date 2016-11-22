import {Component} from '@angular/core';
// import {Platform, ionicBootstrap} from 'ionic-angular';
// import {StatusBar} from 'ionic-native';
import {NavController, ModalController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/root-page/root-page.html'
})

export class RootPage {
    

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) {
  }
  

}
