import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {TournamentPage} from '../tournament'

@Component({
  templateUrl: 'build/pages/tournament/select-team/select-team.html'
})
export class SelectTeamPage {

  private gameSegment: string = 'edit';


  private teams: any = [
    {
      name: 'Boston Celtics',
      img: 'team-logos/celtics.png',
      coach: 'Brad Stevens'
    },{
      name: 'New York Knicks',
      img: 'team-logos/knicks.png',
      coach: 'Jeff Hornacek'
    },{
      name: 'Brooklyn Nets',
      img: 'team-logos/nets.jpg',
      coach: 'Kenny Atkinson'
    },{
      name: 'Miami Heat',
      img: 'team-logos/heat.png',
      coach: 'Micky Arison'
    },{
      name: 'Golden State Warriors',
      img: 'team-logos/warriors.png',
      coach: 'Steve Kerr'
    },{
      name: 'San Antonio Spurs',
      img: 'team-logos/spurs.jpeg',
      coach: 'Gregg Popovich'
    },{
      name: 'Seattle Super Sonics',
      img: 'team-logos/new-medal.svg',
      coach: 'Kevin Tirone'
    }
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToTournamentPage(){
    this.navCtrl.push(TournamentPage);
  }

  // goToTournamentPage() {
  //   this.navCtrl.pop();
  //
  //   let tournamentModal = this.modalCtrl.create(TournamentPage);
  //   tournamentModal.present();
  //
  // };

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
