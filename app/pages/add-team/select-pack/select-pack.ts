import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/add-team/select-pack/select-pack.html'
})
export class SelectPackPage {
  
  private spartans: any = [
    {
      name: 'Zero Gravity Fall 2016 - New England Circut',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      price: 2.99
    },
  ];

  private packs: any = [
    {
      name: 'Personal Pass',
      description: 'Get access for you and your player for the entire tournament season.',
      img: '../../../../personal-pack.svg',
      price: 2.99
    },{
      name: 'Family Pass',
      description: 'Lorem Ipsum',
      img: '../../../../family-pack.svg',
      price: 3.99
    },{
      name: 'Team Pass',
      description: 'Lorem Ipsum',
      img: '../../../../team-pack.svg',
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
