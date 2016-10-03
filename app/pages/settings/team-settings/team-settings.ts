import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/settings/team-settings/team-settings.html'
})

export class TeamSettingsPage {

  private messages: any = [
    {
      title: 'Practice Canceled',
      body: 'Practice has ben canceled today due to the snow storm. We will have our practice this tuesday at 5:00 instead.',
      author: 'Ryan Thomas',
      dateStamp: 'Monday, July 12, 2016',
      timeStamp: '12:34 PM'
    },
    {
      title: 'Tournament Entry Fee Needed For This Weekend',
      body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae. We will have our practice this tuesday at 5:00 instead.',
      author: 'Ryan Thomas',
      dateStamp: 'Saturday, March 8, 2016',
      timeStamp: '12:34 PM'
    },
    {
      title: 'Pasta Party Details',
      body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. We will have our practice this tuesday at 5:00 instead.',
      author: 'Frank Underwood',
      dateStamp: 'Wednesday, February 4, 2016',
      timeStamp: '12:34 PM'
    },
  ];

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController) {
  
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
