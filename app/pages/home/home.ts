import {Component} from '@angular/core';
import {NavController, ModalController, ViewController} from 'ionic-angular';
import {TournamentPage} from '../tournament/tournament';
import {TeamSettingsPage} from '../settings/team-settings/team-settings';
import {TournamentDetailsPage} from '../tournament/details/details';
import {TournamentTabsPage} from '../tournament/tabs/tabs';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  private tournamentTimeView: string = "ongoing"

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

  // goToTournamentPage(){
  //   this.navCtrl.push(TournamentPage);
  // }

  goToTeamSettingsPage(){
    let teamSettingsModal = this.modalCtrl.create(TeamSettingsPage);
    teamSettingsModal.present();
  }
  
  goToTournamentDetailsPage(){
    let detailsModal = this.modalCtrl.create(TournamentDetailsPage);
    detailsModal.present();
  }

    goToTournamentPage(){
    let tournamentModal = this.modalCtrl.create(TournamentTabsPage);
        tournamentModal.present();
  }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
