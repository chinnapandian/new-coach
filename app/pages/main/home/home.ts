import {Component} from '@angular/core';
import {NavController, ModalController, ActionSheetController, Loading, AlertController, PopoverController} from 'ionic-angular';
import {FilterTeamStatePage} from './follow-teams/filter-state/filter-state';
import {AddPopoverPage} from './add-popover/add-popover';
import {PlayerTabs} from './player/player-tabs';
import {AddPlayerPage} from './add-player/add-player';
import {LoginPage} from '../../../pages/auth/login/login';
import {TeamPage} from './team/team';
import {LoginService} from '../../../services/login';
import {AvatarsListService} from  '../../../services/getavatars';
import {MyPlayerConfigService} from  '../../../services/config';
import {GetPlayerStatsService} from  '../../../services/getplayerstats';
import {TitlePipe} from  '../../../pipes/title';
import {StatEventsPage} from './player/stat-events/stat-events';

@Component({
  templateUrl: 'build/pages/main/home/home.html',
  providers :[AvatarsListService,GetPlayerStatsService],
  pipes:[TitlePipe]
})

export class HomePage {

  // Defining variable
  private dataLoading=true;
  private error = false;
  private homeView: string = 'teams';
  public testRadioOpen: any = false;
  public testRadioResult: any;
  private FollowedTeamsPlayers: any = [];
  private FollowedTeams: any = [];
  private FollowedPlayers: any = [];
  private imagePath;
  private boyavatars = [];
  private girlavatars = [];
  statValues = []
  private statCard: any = [
    {
      header: 'PPG',
      value: '0'
    },{
      header: 'RPG',
      value: '0'
    },{
      header: 'APG',
      value: '0'
    },{
      header: '2FG%',
      value: '0'
    },{
      header: '3FG%',
      value: '0'
    },{
      header: 'STL',
      value: '0'
    },{
      header: 'TO',
      value: '0'
    },{
      header: 'BLK',
      value: '0'
    }
  ];
  private teams : Object = []; private boysteams = []; private girlsteams = [];
  constructor(private navCtrl: NavController,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public asCtrl: ActionSheetController,
              private avatars : AvatarsListService,
              private loginService : LoginService,
              private _config: MyPlayerConfigService,
              private playerstatsService:GetPlayerStatsService) {
                        
                    this.homeView = (localStorage.getItem('homeView')==null?this.homeView:localStorage.getItem('homeView'));       
                    this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/";
                 /*   this.loginService.login(this.loginService.getLoginData())      
                    .subscribe(data => {
                          console.log(data);
                          this._config.setAuthToken(data.AuthToken);
                          this.loginService.setUserInfo(data);
                          this.loginService.setRegUserTournaments(data.RegUserTournaments);
                          this.loginService.setRegUserPlayers(data.RegUserPlayers); */
                          
                          this.FollowedTeamsPlayers = this.loginService.getRegUserPlayers();
                          console.log(this.FollowedTeamsPlayers.length);
                          if(this.FollowedTeamsPlayers.length == 0)
                          {
                            this.dataLoading = false;
                            this.FollowedTeams = null;
                            this.error=true;
                            console.log("error="+ this.error);
                            this.loginService.setFollowedTeams(null); 
                          }  
                          else
                          {
                            this.FollowedTeams = this.removeDuplicates(this.FollowedTeamsPlayers, "TeamId");
                            console.log(this.FollowedTeams);
                            this.loginService.setFollowedTeams(this.FollowedTeams);       
                       /*     this.FollowedTeamsPlayers.forEach(obj => {
                              if(obj.PlayerUserId!=0)
                                this.FollowedPlayers.push(obj);
                                console.log(this.FollowedPlayers);
                                
                            });  */
                          
                            //getPlayerStats
                            console.log(this.loginService.getUserInfo().Context.User.UserId);
                            this.playerstatsService.getPlayerStats(this.loginService.getUserInfo().Context.User.UserId,0,0,0)      
                                      .subscribe(data => {
                                        console.log(data);
                                            this.FollowedPlayers = data.PlayerStatsinfo;
                                            console.log(this.FollowedPlayers);
                                            this.dataLoading=false;
                                            this.error=((this.FollowedTeams == null)&&(this.dataLoading==false))?true:false;
                                            console.log("error="+ this.error);
                                      });
                           
                          }                          
                 //   });                                  
  }

 getStatValue(index1,index2){
   var player = this.FollowedPlayers[index1];
   var statvalues = [player.PPG, player.RPG, player.APG, player.FG2, player.FG3,player.STL,player.TO, player.BLK];
   return statvalues[index2];
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

 goToStatEventsPage(player){
    localStorage.setItem("SelectedPlayerId", player.CustodianPlayer.PlayerUserId);
    localStorage.setItem("SelectedPlayerTeamId", player.CustodianPlayer.TeamId);
  //  localStorage.setItem("SelectedPlayerTeamId", '500');
    localStorage.setItem("PlayerTabIndex", '1');
    let playerModal = this.modalCtrl.create(PlayerTabs);
    playerModal.present();
 }

  goToPlayerTabs(player){
    console.log(player);
    localStorage.setItem("SelectedPlayerId", player.CustodianPlayer.PlayerUserId);
    localStorage.setItem("PlayerTabIndex", '0');
    localStorage.setItem("SelectedPlayerStats",JSON.stringify(player));
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
