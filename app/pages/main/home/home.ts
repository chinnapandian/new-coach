import {Component} from '@angular/core';
import {NavController, ModalController, ActionSheetController, Loading, AlertController, PopoverController} from 'ionic-angular';
import {FilterTeamStatePage} from './follow-teams/filter-state/filter-state';
import {AddPopoverPage} from './add-popover/add-popover';
import {PlayerTabs} from './player/player-tabs';
import {AddPlayerPage} from './add-player/add-player';
import {TeamPage} from './team/team';
import {LoginService} from '../../../services/login';

@Component({
  templateUrl: 'build/pages/main/home/home.html'
})

export class HomePage {

  // Defining variable
  private dataLoading=true;
  private homeView: string = 'teams';
  public testRadioOpen: any = false;
  public testRadioResult: any;
  private FollowedTeamsPlayers: any = [];
  private FollowedTeams: any = [];
  private FollowedPlayers: any = [];

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
  private teams : Object = []; private boysteams = []; private girlsteams = [];
  constructor(private navCtrl: NavController,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public asCtrl: ActionSheetController,
              private loginService : LoginService) {

    this.FollowedTeamsPlayers = this.loginService.getRegUserPlayers();
    this.FollowedTeams = this.removeDuplicates(this.FollowedTeamsPlayers, "TeamId");
    this.loginService.setFollowedTeams(this.FollowedTeams);   
    console.log(this.FollowedTeams);  
       
    this.FollowedTeams.forEach(obj => {
      if(obj.PlayerUserId!=0)
        this.FollowedPlayers.push(obj);
    });  
    console.log(this.FollowedPlayers);
    this.dataLoading = false;
  }

  // presentPopover() {
  //   let popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present();
  // }
  removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};

        for(var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
          return newArray;
    }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(AddPopoverPage);
    popover.present({
      ev: event
    });

  }

  goToPlayerTabs(player){
    localStorage.setItem("SelectedPlayerId", player.PlayerUserId);
    let playerModal = this.modalCtrl.create(PlayerTabs);
    playerModal.present();
  }

  goToTeamPage(team){
    let teamModal = this.modalCtrl.create(TeamPage,{
      SelectedTeam : team
    });
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
