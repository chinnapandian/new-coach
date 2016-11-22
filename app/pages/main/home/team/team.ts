import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/main/home/team/team.html'
})

export class TeamPage {
  
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
