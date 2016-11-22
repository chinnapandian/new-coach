import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/selected-event/event-standings/division-filter/division-filter.html'
})
export class StandingsDivisionFilterPage {

  private divisions: any = [
    {
      name: 'Boys 8U'
    },{
      name: 'Boys 10U'
    },{
      name: 'Boys 12U'
    },{
      name: 'Boys 13U'
    },{
      name: 'Boys 14U'
    },{
      name: 'Boys 15U'
    },{
      name: 'Boys 16U'
    },{
      name: 'Boys Varsity'
    },{
      name: 'Girls 8U'
    },{
      name: 'Girls 10U'
    },{
      name: 'Girls 12U'
    },{
      name: 'Girls 13U'
    },{
      name: 'Girls 14U'
    },{
      name: 'Girls 15U'
    },{
      name: 'Girls 16U'
    },{
      name: 'Girls Varsity'
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
