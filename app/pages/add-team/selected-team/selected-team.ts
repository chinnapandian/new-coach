import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectedSeasonPage} from "../selected-season/selected-season";

@Component({
  templateUrl: 'build/pages/add-team/selected-team/selected-team.html'
})
export class SelectedTeamPage {

  private seasonOrTournament: string = 'seasons';

  private spartans: any = [
    {
      name: 'NH Boys U12 Spartans',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      coach: 'Ryan Howard'
    },
  ];

  private seasons: any = [
    {
      name: 'Zero Gravity Fall 2016',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      numOfTournaments: 4,
      price: 2.99
    },{
      name: 'Zero Gravity Summer 2016',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      numOfTournaments: 5,
      price: 3.99
    },{
      name: 'Hoop Group 2016',
      img: 'http://www.tourneymachine.com/Public/Results/Tournament.aspx?IDTournament=h20160831143520440ffa5c231d9624a',
      numOfTournaments: 4,
      price: 1.99
    },
  ];

  private tournaments: any = [
    {
      name: 'Zero Gravity Battle of the Baskets',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    },{
      name: 'Zero Gravity Summer Showdown',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    },{
      name: 'Zero Gravity King of the Coast',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    },
  ];


  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }


  goToSelectedSeasonPage(){
    this.navCtrl.push(SelectedSeasonPage)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
