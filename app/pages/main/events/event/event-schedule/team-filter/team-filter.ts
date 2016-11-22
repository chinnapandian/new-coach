import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, PopoverController} from 'ionic-angular';
import {TeamDivisionFilterPage} from './division-filter/division-filter';

@Component({
  templateUrl: 'build/pages/main/events/event/event-schedule/team-filter/team-filter.html'
})

export class TeamFilterPage {

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
      img: 'medal-shadow.png',
      coach: 'Kevin Tirone'
    }
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private popoverCtrl: PopoverController,
      private modalCtrl: ModalController) {
  }

  // goToTeamDivisionFilterPage(){
  //   this.navCtrl.push(TeamDivisionFilterPage);
  // }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(TeamDivisionFilterPage);
    popover.present({
      ev: event
    });
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
