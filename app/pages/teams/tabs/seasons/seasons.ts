import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectPackPage} from '../../../add-team/select-pack/select-pack'
import {TournamentPage} from "../../../tournament/tournament";
import {TournamentTabsPage} from "../../../tournament/tabs/tabs";
import {TeamTabsPage} from "../tabs";

@Component({
  templateUrl: 'build/pages/teams/tabs/seasons/seasons.html'
})
export class SeasonsPage {

  private scheduleView: string = "game"

  private myTournaments: any = [
    {
      name: 'Zero Gravity Battle of the Baskets',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
      date: 'September 12 - 13, 2016',
      price: .99
    },{
      name: 'Zero Gravity Fall Showdown',
      img: 'http://admin.tourneymachine.com/TournamentFiles/h201606081959263159a61ea9a0d2b48/e326e697caa6d92dc37d10362b42e0ef_article_image_2301185-640.png',
      date: 'September 28 - 29, 2016',
      price: .99
    },{
      name: 'Zero Gravity King of the Coast',
      img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h20140923064359771d8fd157e38db47/Indy.png',
      date: 'November 3 - 4, 2016',
      price: .99
    },{
      name: 'Zero Gravity One Day Showcase',
      img: '../../../new-medal.svg',
      date: 'November 15 - 17, 2016',
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

  goToPurchaseSeasonPage(){
    let x = this.modalCtrl.create(SelectPackPage);
    x.present();
  }

  goToTournament(){
    // this.navCtrl.push(TournamentTabsPage);
    // this.navCtrl.pop(TeamTabsPage);
    let y = this.modalCtrl.create(TournamentTabsPage);
    y.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
