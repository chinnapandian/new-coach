import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {FindTournamentDivisionsPage} from './divisions/find-divs'

@Component({
  templateUrl: 'build/pages/tournament/find/find-tourn.html'
})
export class FindTournamentPage {

  private tournaments: any = [
    {
      name: 'Special Olympics Basketball Tournament Fundraiser',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      startDate: '12/12/12',
      endDate: '12/12/14',
      location: 'Tea, SD',
      id: '5H7Q21'
    },{
      name: 'King of The Coast',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      startDate: '12/12/12',
      endDate: '12/12/14',
      location: 'Tea, SD',
      id: '5H7Q21'
    },{
      name: 'Special Olympics Basketball Tournament Fundraiser',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      startDate: '12/12/12',
      endDate: '12/12/14',
      location: 'Tea, SD',
      id: '5H7Q21'
    }
  ];
  
  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }
  

  goToDivisionPage(){
    this.navCtrl.push(FindTournamentDivisionsPage)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
