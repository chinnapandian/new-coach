import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SeasonsPage} from './seasons/seasons';

@Component({
  templateUrl: 'build/pages/teams/this-team/this-team.html'
})
export class ThisTeamPage {


  private spartans: any = [
    {
      name: 'NH Boys U12 Spartans',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      coach: 'Ryan Howard'
    },
  ];

  
  private teamPages: any = [
    {
      name: 'Seasons / Tournaments',
      num: '',
      icon: 'trophy'
    },{
      name: 'Leagues',
      num: '',
      icon: 'calendar'
    },{
      name: 'Practice Schedule',
      num: '2',
      icon: 'calendar'
    },{
      name: 'Message Board',
      num: '8 new messages',
      icon: 'chatbubbles'
    },{
      name: 'Events',
      num: '0',
      icon: 'chatbubbles'
    },{
      name: 'Roster',
      num: '',
      icon: 'chatbubbles'
    }
  ];


  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToSeasonsPage(){
    this.navCtrl.push(SeasonsPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
