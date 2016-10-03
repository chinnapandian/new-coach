import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectPackPage} from '../select-pack/select-pack'

@Component({
  templateUrl: 'build/pages/add-team/selected-season/selected-season.html'
})
export class SelectedSeasonPage {
  
  private spartans: any = [
    {
      name: 'Zero Gravity Fall 2016 - New England Circut',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: 2.99
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
      name: 'Zero Gravity Fall Showdown',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    },{
      name: 'Zero Gravity King of the Coast',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    },{
      name: 'Zero Gravity Rumble at The RIM',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    },{
      name: 'Zero Gravity Fall Brawl',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    },{
      name: 'Zero Gravity Live at The House',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    },{
      name: 'Zero Gravity Beast of The East',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: .99
    }
  ];


  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }


  goToSelectPackPage(){
    this.navCtrl.push(SelectPackPage)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
