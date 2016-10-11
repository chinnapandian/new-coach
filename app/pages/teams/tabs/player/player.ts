import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/teams/tabs/player/player.html'
})
export class PlayerPage {
  
  private statsView: string = 'average';

  private myTournaments: any = [
    {
      name: 'Zero Gravity Battle of the Baskets',
      date: 'September 12 - 13, 2016',
      price: .99
    },{
      name: 'Zero Gravity Fall Showdown',
      date: 'September 28 - 29, 2016',
      price: .99
    },{
      name: 'Zero Gravity King of the Coast',
      date: 'November 3 - 4, 2016',
      price: .99
    }
  ];

  private allSeasons: any = [
    {
      HoopGroup: [
        {
          name: 'Zero Gravity Battle of the Baskets',
          img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
          price: .99
        }
      ],
      StarGroup: [
        {
          name: 'Zero Gravity Battle of the Baskets',
          img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
          price: .99
        }
      ],
    }
  ];

  private allTournaments: any = [
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

  // goToMessageBoardPage(){
  //   this.navCtrl.push(MessageBoardPage);
  // }


  dismiss() {
    this.viewCtrl.dismiss();
  }
}
