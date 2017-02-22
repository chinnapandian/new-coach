import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, Loading, ViewController, AlertController, PopoverController } from 'ionic-angular';
import { FilterTeamStatePage } from './follow-teams/filter-state/filter-state';
import { AddPopoverPage } from './add-popover/add-popover';
import { PlayerTabs } from './player/player-tabs';
import { AddPlayerPage } from './add-player/add-player';
import { LoginPage } from '../../../pages/auth/login/login';
import { LandingPage } from '../../../pages/auth/landing/landing';
import { TeamPage } from './team/team';
import { LoginService } from '../../../services/login';
import { AvatarsListService } from '../../../services/getavatars';
import { MyPlayerConfigService } from '../../../services/config';
import { GetPlayerStatsService } from '../../../services/getplayerstats';
import { TitlePipe } from '../../../pipes/title';
import { SortPipe } from '../../../pipes/sort';
import { StatEventsPage } from './player/stat-events/stat-events';
import { GroupFollowedTeamsByOrgPipe } from '../../../pipes/groupfollowedteamsbyorgid';

@Component({
  templateUrl: 'build/pages/main/home/home.html',
  providers: [AvatarsListService, GetPlayerStatsService],
  pipes: [TitlePipe, SortPipe, GroupFollowedTeamsByOrgPipe]
})

export class HomePage {
  // Defining variable
  private dataLoading = true;
  private playerdataLoading = true;
  private error = false;
  private playererror = false;
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
    }, {
      header: 'RPG',
      value: '0'
    }, {
      header: 'APG',
      value: '0'
    }, {
      header: '2FG%',
      value: '0'
    }, {
      header: '3FG%',
      value: '0'
    }, {
      header: 'STL',
      value: '0'
    }, {
      header: 'TO',
      value: '0'
    }, {
      header: 'BLK',
      value: '0'
    }
  ];
  private teams: Object = []; private boysteams = []; private girlsteams = [];

  private statsHeadings: any = [
    'PTS',
    'REB',
    'AST',
    'STL',
    'TO',
    'BLK',
  ];

  private quickStatsHeadings: any = [
    'PPG',
    'FG%',
    '3P%',
    'FT%',
    'RPG',
    'APG',
  ];

  private statGP: any = [
    {
      header: 'Games Played',
      value: '0'
    }
  ];

  private statPTS: any = [
    {
      header: 'Points',
      value: '0'
    }
  ];

  private statFG: any = [
    {
      header: 'FGM',
      value: '0'
    }, {
      header: 'FGA',
      value: '0'
    }, {
      header: 'FG%',
      value: '0'
    }
  ];

  private statFG2: any = [
    {
      header: '2PM',
      value: '0'
    }, {
      header: '2PA',
      value: '0'
    }, {
      header: '2P%',
      value: '0'
    }
  ];

  private statFG3: any = [
    {
      header: '3PM',
      value: '0'
    }, {
      header: '3PA',
      value: '0'
    }, {
      header: '3P%',
      value: '0'
    }
  ];

  private statFT: any = [
    {
      header: 'FTM',
      value: '0'
    }, {
      header: 'FTA',
      value: '0'
    }, {
      header: 'FT%',
      value: '0'
    }
  ];

  private statRB: any = [
    {
      header: 'OREB',
      value: '0'
    }, {
      header: 'DREB',
      value: '0'
    }, {
      header: 'REB%',
      value: '0'
    }
  ];

  private statBC: any = [
    {
      header: 'AST',
      value: '0'
    }, {
      header: 'STL',
      value: '0'
    }, {
      header: 'TOV',
      value: '0'
    }, {
      header: 'BLK',
      value: '0'
    }
  ];
  private SelectedPlayer;
  private SelectedPlayerStats;
  private UserRole;

  constructor(private navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public asCtrl: ActionSheetController,
    private avatars: AvatarsListService,
    private loginService: LoginService,
    private _config: MyPlayerConfigService,
    private playerstatsService: GetPlayerStatsService,
    private viewCtrl:ViewController) {
//  localStorage.setItem("TabIndex","0");
  /*  if(document.getElementsByTagName("ion-modal").length!=0)
       this.navCtrl.remove(this.viewCtrl.index);*/
    this.homeView = (localStorage.getItem('homeView') == null ? this.homeView : localStorage.getItem('homeView'));
    this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/";
    this.fillData();
    if(this.UserRole == 'player')
    this.getPlayerProfile();
  }
  ionViewWillEnter() {
//  localStorage.setItem("TabIndex","0");
    
    this.homeView = (localStorage.getItem('homeView') == null ? this.homeView : localStorage.getItem('homeView'));
    this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/";
    this.fillData();
    if(this.UserRole == 'player')
        this.getPlayerProfile();
  }
  setGender(gender) {
    if (gender == 'M')
      return 'B';
    else
      return 'G';
  }
  fillData() {
    this.UserRole = this.loginService.getUserInfo().Context.User.UserRole.toLowerCase();
    this.FollowedTeamsPlayers = this.loginService.getCustodianTeam();
    console.log(this.FollowedTeamsPlayers);
    this.dataLoading = false;
    if (this.FollowedTeamsPlayers == null) {
      this.FollowedTeams = null;
      this.error = true;
      this.playererror = true;
      this.loginService.setFollowedTeams(null);
    }
    else {
      if (this.FollowedTeamsPlayers.length == 0) {
        this.FollowedTeams = null;
        this.error = true;
        this.playererror = true;
        this.loginService.setFollowedTeams(null);
      }
      else {
        // this.FollowedTeams = this.removeDuplicates(this.FollowedTeamsPlayers, "TeamId");
        // console.log(this.FollowedTeams);
        this.FollowedTeams = this.FollowedTeamsPlayers;
        this.loginService.setFollowedTeams(this.FollowedTeams);
        /*     this.FollowedTeamsPlayers.forEach(obj => {
               if(obj.PlayerUserId!=0)
                 this.FollowedPlayers.push(obj);
                 console.log(this.FollowedPlayers);
                 
             });  */

        //getPlayerStats
        console.log(this.loginService.getUserInfo().Context.User.UserId);
        this.playerstatsService.getPlayerStats(this.loginService.getUserInfo().Context.User.UserId, 0, 0, 0, 0,this.loginService.getUserInfo().Context.User.UserRole)
          .subscribe(data => {
            console.log(data);
            this.FollowedPlayers = data.PlayerStatsinfo;
            console.log(this.FollowedPlayers);
            this.playerdataLoading = false;
            this.error = (this.FollowedTeams == null) ? true : false;
            this.playererror = (this.FollowedPlayers.length == 0) ? true : false;
            console.log("error=" + this.error);
          });

      }
    }
    //   });                                  
  }

  getStatValue(index1, index2) {
    var player = this.FollowedPlayers[index1];
    var statvalues = [player.PPG, player.RPG, player.APG, player.FG2, player.FG3, player.STL, player.TO, player.BLK];
    return statvalues[index2];
  }

  // presentPopover() {
  //   let popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present();
  // }


  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
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

  goToStatEventsPage(player) {
    localStorage.setItem("SelectedPlayerId", player.CustodianPlayer.PlayerUserId);
    localStorage.setItem("SelectedPlayerTeamId", player.CustodianPlayer.TeamId);
    localStorage.setItem("SelectedPlayerStats", JSON.stringify(player));
    console.log(player);
    //  localStorage.setItem("SelectedPlayerTeamId", '500');
    localStorage.setItem("PlayerTabIndex", '1');
    let playerModal = this.modalCtrl.create(PlayerTabs);
    playerModal.present();
  }

  goToPlayerTabs(player) {
    console.log(player);
    localStorage.setItem("SelectedPlayerId", player.CustodianPlayer.PlayerUserId);
    localStorage.setItem("PlayerTabIndex", '0');
    localStorage.setItem("SelectedPlayerStats", JSON.stringify(player));
    let playerModal = this.modalCtrl.create(PlayerTabs);
    playerModal.present();
  }

  goToTeamPage(team) {
    let teamModal = this.modalCtrl.create(TeamPage, {
      SelectedTeam: team
    });
    teamModal.onDidDismiss(data => {
      this.fillData();
    })
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

  getPlayerProfile() {
    this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/";
    this.playerstatsService.getPlayerStats(this.loginService.getUserInfo().Context.User.UserId, 0, 0, 0, 0,this.loginService.getUserInfo().Context.User.UserRole)
      .subscribe(data => {
        console.log(data);
        this.SelectedPlayer = data.PlayerStatsinfo[0].CustodianPlayer;
        console.log(this.SelectedPlayer);
        this.SelectedPlayerStats = data.PlayerStatsinfo[0];
        console.log(this.SelectedPlayerStats);
        // set player statistics
        var statCardValues = [this.SelectedPlayerStats.PPG, this.SelectedPlayerStats.RPG, this.SelectedPlayerStats.APG,
        this.SelectedPlayerStats.FGPerCent, this.SelectedPlayerStats.P3PerCent, this.SelectedPlayerStats.FTPerCent];
        for (let i = 0; i < this.statCard.length; i++)
          this.statCard[i].value = statCardValues[i];
        this.statGP[0].value = this.SelectedPlayerStats.GamesPlayed;
        this.statPTS[0].value = this.SelectedPlayerStats.Points;
        var statFGValues = [this.SelectedPlayerStats.FGM, this.SelectedPlayerStats.FGA, this.SelectedPlayerStats.FGPerCent];
        for (let i = 0; i < this.statFG.length; i++)
          this.statFG[i].value = statFGValues[i];
        var statFG2Values = [this.SelectedPlayerStats.PM2, this.SelectedPlayerStats.PA2, this.SelectedPlayerStats.P2PerCent];
        for (let i = 0; i < this.statFG2.length; i++)
          this.statFG2[i].value = statFG2Values[i];
        var statFG3Values = [this.SelectedPlayerStats.PM3, this.SelectedPlayerStats.PA3, this.SelectedPlayerStats.P3PerCent];
        for (let i = 0; i < this.statFG3.length; i++)
          this.statFG3[i].value = statFG3Values[i];
        var statFTValues = [this.SelectedPlayerStats.FTM, this.SelectedPlayerStats.FTA, this.SelectedPlayerStats.FTPercent];
        for (let i = 0; i < this.statFT.length; i++)
          this.statFT[i].value = statFTValues[i];
        var statRBValues = [this.SelectedPlayerStats.OREB, this.SelectedPlayerStats.DREB, this.SelectedPlayerStats.REBPercent];
        for (let i = 0; i < this.statRB.length; i++)
          this.statRB[i].value = statRBValues[i];
        var statBCValues = [this.SelectedPlayerStats.ASTCount, this.SelectedPlayerStats.STLCount, this.SelectedPlayerStats.TOCount, this.SelectedPlayerStats.BLKCount];
        for (let i = 0; i < this.statBC.length; i++)
          this.statBC[i].value = statBCValues[i];
      })

  }

}
