import {Component} from '@angular/core';
import {NavController, ModalController,App} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/auth/blankpage.html'
})

export class BlankPage {
private tabBarElement;
  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) {
        
  }
}
