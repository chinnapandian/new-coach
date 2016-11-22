import {Component} from '@angular/core';
import {NavController, ModalController, ActionSheetController, AlertController, PopoverController} from 'ionic-angular';
import {FilterTeamStatePage} from './follow-teams/filter-state/filter-state';
import {AddPopoverPage} from './add-popover/add-popover';
import {PlayerTabs} from './player/player-tabs';
import {AddPlayerPage} from './add-player/add-player';
import {TeamPage} from './team/team';

@Component({
  templateUrl: 'build/pages/main/home/home.html'
})

export class HomePage {

  // Defining variable

  private homeView: string = 'teams';
  public testRadioOpen: any = false;
  public testRadioResult: any;

  private basketballTeams: any = [
    {
      name: 'Spartans Boys 15U',
      org: 'NH Spartans',
      coach: 'Ryan Wilson',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      sport: 'basketball',
    },
    {
      name: 'Warroiors Boys 15U',
      org: 'MA Warroiors',
      coach: 'Ryan Wilson',
      img: 'https://pbs.twimg.com/profile_images/415334320619130880/jz1mwqe_.jpeg',
      sport: 'basketball',
    },
  ];

  private statCard: any = [
    {
      header: 'PPG',
      value: '12.3'
    },{
      header: 'RPG',
      value: '5.3'
    },{
      header: 'APG',
      value: '2.9'
    },{
      header: 'FG%',
      value: '34.6%'
    },{
      header: '3P%',
      value: '10.3%'
    },{
      header: 'FT%',
      value: '72.1%'
    }
  ];

  constructor(private navCtrl: NavController,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public asCtrl: ActionSheetController) {
  }

  // presentPopover() {
  //   let popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present();
  // }


  presentPopover(event) {
    let popover = this.popoverCtrl.create(AddPopoverPage);
    popover.present({
      ev: event
    });
  }

  goToPlayerTabs(){
    let playerModal = this.modalCtrl.create(PlayerTabs);
    playerModal.present();
  }

  goToTeamPage(){
    let teamModal = this.modalCtrl.create(TeamPage);
    teamModal.present();
  }

  goToFilterTeamGenderPage() {
    let x = this.modalCtrl.create(FilterTeamStatePage);
    x.present();
  };

  presentActionSheet() {
    let actionSheet = this.asCtrl.create({
      buttons: [
        {
          text: 'Follow Teams',
          handler: () => {
            let addPlayerModal = this.modalCtrl.create(FilterTeamStatePage);
            addPlayerModal.present();
          }
        },
        {
          text: 'Add Players',
          handler: () => {
            let addPlayerModal = this.modalCtrl.create(AddPlayerPage);
            addPlayerModal.present();
            console.log('player clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
