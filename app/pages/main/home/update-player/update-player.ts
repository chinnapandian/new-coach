import { Component, Injectable } from '@angular/core';
import { NavController, ViewController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { UpdatePlayerAvatarPage } from "./update-avatar/update-avatar";
import { LoginService } from '../../../../services/login';
import { PlayerPositionListService } from '../../../../services/getplayerposition';
import { SavePlayerService } from '../../../../services/saveplayer';
import { MyPlayerConfigService } from '../../../../services/config';
import { TitlePipe } from '../../../../pipes/title';
import { AvatarsListService } from '../../../../services/getavatars';
import { MainTabs } from "../../../main/tabs/main-tabs";

@Injectable()
export class PlayerData {
  FollowupTeams = [];
}


@Component({
  templateUrl: 'build/pages/main/home/update-player/update-player.html',
  providers: [PlayerPositionListService, SavePlayerService, AvatarsListService],
  pipes: [TitlePipe]
})

export class UpdatePlayerPage {
  private followedPlayers = [];
  private positions = [];
  private playerposition;
  private TeamId = [];
  private TeamName;
  private JerseyNumber;
  private dataLoading = true;
  private firstName;
  private lastName;
  private Email;
  private save = 0;
  private playerUserId;
  private reminders: boolean;
  private alerts: boolean;
  private SelectedAvatar;
  private imagePath;
  private boyavatars = [];
  private girlavatars = [];
  private followedTeams = [];
  private teamIds = [];
  private teamerror = 0;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private _loginService: LoginService,
    private _playerposition: PlayerPositionListService,
    private _saveplayer: SavePlayerService,
    private alertCtrl: AlertController,
    private avatars: AvatarsListService,
    private navParams: NavParams,
    private _config: MyPlayerConfigService) {

    this.SelectedAvatar = (this.navParams.get("SelectedAvatar") == null ? "boys/joe.svg" : this.navParams.get("SelectedAvatar"));
    this.playerUserId = (localStorage.getItem("SelectedPlayerId") != null ? localStorage.getItem("SelectedPlayerId") : 0);
    this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/";
    this.followedPlayers = this._loginService.getRegUserPlayers();
    console.log(this.followedPlayers);
    this.followedTeams = this.removeDuplicates(this._loginService.getFollowedTeams(), "TeamId");
    this._playerposition.getPositionsList()
      .subscribe(data => {
        this.positions = data;
        this.fillPlayerData();
        this.dataLoading = false;
      })


  }

  fillPlayerData() {
    var SelectedPlayerProfile = JSON.parse(localStorage.getItem("SelectedPlayerStats"));
    console.log(SelectedPlayerProfile);
    this.teamIds = SelectedPlayerProfile.CustodianPlayer.TeamIds.split(",");
    console.log(this.teamIds);
    /*  this.followedPlayers.forEach(player => {
              if(player.PlayerUserId == this.playerUserId){*/
    this.playerposition = SelectedPlayerProfile.CustodianPlayer.Code;
    this.TeamId = this.teamIds;
    this.firstName = SelectedPlayerProfile.CustodianPlayer.FirstName;
    this.lastName = SelectedPlayerProfile.CustodianPlayer.LastName;
    this.Email = SelectedPlayerProfile.CustodianPlayer.EmailAddress;
    this.SelectedAvatar = SelectedPlayerProfile.CustodianPlayer.Avatar;
    this.JerseyNumber = SelectedPlayerProfile.CustodianPlayer.JerseyNumber;
    this.alerts = (SelectedPlayerProfile.CustodianPlayer.SuspendAlerts == "" || SelectedPlayerProfile.CustodianPlayer.SuspendAlerts == 'N') ? false : true;
    this.reminders = (SelectedPlayerProfile.CustodianPlayer.SuspendNotification == "" || SelectedPlayerProfile.CustodianPlayer.SuspendNotification == 'N') ? false : true;
    /*      }
        });*/
  }

  goToUpdatePlayerAvatarPage() {
    let UpdatePlayerAvatarModal = this.modalCtrl.create(UpdatePlayerAvatarPage,
      {
        SelectedAvatar: this.SelectedAvatar,
        SelectedTeamId: this.teamIds[0]
      });
    UpdatePlayerAvatarModal.present();
    UpdatePlayerAvatarModal.onDidDismiss(data => {
      this.SelectedAvatar = data;
    })
  }

  dismiss() {
    localStorage.setItem('homeView', 'players');
    localStorage.setItem('TabIndex', '0');
    this.viewCtrl.dismiss();
    this.navCtrl.remove(this.viewCtrl.index);
    this.navCtrl.remove(this.viewCtrl.index - 1);
    this.navCtrl.pop();



    
    // this.navCtrl.setRoot(MainTabs);
  }

  savePlayer(status) {
    console.log("saveplayer");
    this.save = 1;
    var FollowupTeams = [];
    let _playerData = new PlayerData;
    localStorage.setItem('homeView', 'players');
    localStorage.setItem('TabIndex', '0');
    if (this.teamerror == 0) {
      if (this.validateData() == true) {
        console.log(this.TeamId.length);
        for (let i = 0; i < this.TeamId.length; i++) {
          _playerData.FollowupTeams.push({
            PlayerUserId: parseInt(this.playerUserId),
            UserId: this._loginService.getUserInfo().Context.User.UserId,
            TeamId: this.TeamId[i],
            Avatar: this.SelectedAvatar,
            FirstName: this.firstName,
            LastName: this.lastName,
            EmailAddress: this.Email,
            JerseyNumber: this.JerseyNumber,
            Position: this.playerposition,
            SuspendNotification: (this.reminders == false) ? 'N' : 'Y',
            SuspendAlerts: (this.alerts == false) ? 'N' : 'Y',
            Status: status.substring(0, 1)
          });
          console.log(_playerData);
        }

        this._saveplayer.savePlayer(_playerData)
          .subscribe(data => {
            console.log(data);
            if (data.IsSuccess == true) {
              console.log(data);
              // this._loginService.setRegUserTournaments(data.RegUserTournaments);
              this._loginService.setRegUserPlayers(data.RegUserPlayers);
              this.viewCtrl.dismiss();
              this.navCtrl.remove(this.viewCtrl.index);
              this.navCtrl.remove(this.viewCtrl.index - 1);
              this.navCtrl.pop();
              //  this.navCtrl.setRoot(MainTabs);         
            }
            else {
              let alert = this.alertCtrl.create({
                title: 'Login',
                subTitle: data.Messages[0],
                buttons: [{
                  text: 'OK',
                  handler: () => {
                    localStorage.setItem("SelectedPlayerId", null);
                    this.Email = '';
                  }
                }],
              });
              alert.present();
            }
          })
      }
    }
  }

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

  validateData() {
    if ((this.firstName != "") && (this.lastName != "") && (this.Email != "") && (this.save == 1))
      return true;
    else
      return false;
  }

  checkPlayerCountPerTeam() {
  
    this.teamerror=0;
    var SelectedPlayerProfile = JSON.parse(localStorage.getItem("SelectedPlayerStats"));
    console.log(SelectedPlayerProfile);
    var originalTeamIds= SelectedPlayerProfile.CustodianPlayer.TeamIds;
    var reguserplayers = this._loginService.getRegUserPlayers();
    console.log(reguserplayers);
    
      for (let j = 0; j < reguserplayers.length; j++) {
          if (reguserplayers[j].PlayerUserId != 0) {
             for (let i = 0; i < this.TeamId.length; i++){
                  if (this.TeamId[i] == reguserplayers[j].TeamId)
                  {
                     console.log(this.TeamId[i]);
                     console.log(reguserplayers[j].TeamId);
                      this.teamerror = 1;
                      this.TeamId = originalTeamIds;
                  }
           }
        }
      }
    console.log(this.TeamId);
    console.log(this.teamerror);
  }
}
