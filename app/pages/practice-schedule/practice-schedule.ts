import {Component} from '@angular/core';
import {NavController, ModalController, ViewController} from 'ionic-angular';
// import {TournamentPage} from '../tournament/tournament';
// import {SettingsListPage} from '../settings/settings-list';
// import {TournamentDetailsPage} from '../tournament/details/details';
// import {TournamentTabsPage} from '../tournament/tabs/tabs';


@Component({
  templateUrl: 'build/pages/practice-schedule/practice-schedule.html'
})
export class PracticeSchedulePage {


  private selectedTeam: any = [
    {
      name: 'Spartans Boys 12U',
      coach: 'Ryan Wilson',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      sport: 'basketball',
      foo: false
    }
  ];

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController) {
  
  }



    dismiss() {
        this.viewCtrl.dismiss();
    }
}
