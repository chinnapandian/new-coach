import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/main/events/event/event-brackets/division-filter/division-filter.html'
})
export class BracketsDivisionFilterPage {

  private divisions: any = [
    {
      name: 'Boys 8U',
      pools: '6'
    },{
      name: 'Boys 10U',
      pools: '6'
    },{
      name: 'Boys 12U',
      pools: '6'
    },{
      name: 'Boys 13U',
      pools: '6'
    },{
      name: 'Boys Varsity',
      pools: '6'
    },{
      name: 'Girls 8U',
      pools: '6'
    },{
      name: 'Girls 10U',
      pools: '6'
    }
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
