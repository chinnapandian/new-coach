import { Component, Injectable } from '@angular/core';
import { NavController, ViewController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { AddPlayerAvatarPage } from "./add-avatar/add-avatar";
import { LoginService } from '../../../../services/login';
import { PlayerPositionListService } from '../../../../services/getplayerposition';
import { SavePlayerService } from '../../../../services/saveplayer';
import { MyPlayerConfigService } from '../../../../services/config';
import { TitlePipe } from '../../../../pipes/title';
import { AvatarsListService } from '../../../../services/getavatars';
import { MainTabs } from "../../../main/tabs/main-tabs";
import {GetCustodianPlayersByTeamIdService} from '../../../../services/getcustodianplayersbyteamid';

@Injectable()
export class PlayerData {
  /* UserId;
   TeamId;
   Avatar;
   PlayerUserId;
   JerseyNumber;
   Position;
   SuspendNotification;
   SuspendAlerts;
   Status;
   FirstName;
   LastName;
   EmailAddress;
   SelectedAvatar;*/
  FollowupTeams = [];
}

@Component({
  templateUrl: 'build/pages/main/home/add-player/add-player.html',
  providers: [PlayerPositionListService, SavePlayerService, AvatarsListService,GetCustodianPlayersByTeamIdService],
  pipes: [TitlePipe]
})

export class AddPlayerPage {
  private followedTeams = [];
  private followedPlayers = [];
  private positions = [];
  private playerposition;
  private TeamId = -1;
  private TeamName;
  private JerseyNumber;
  private dataLoading = true;
  private firstName;
  private lastName;
  private Email;
  private save = 0;
  private playerUserId =0;
  private SelectedAvatar;
  private imagePath;
  private boyavatars = [];
  private girlavatars = [];
  private otherCustodiansFollowedPlayers=[];
  private teamerror=0;
  private newplayer=0;
  private playererror=0;

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
    private _config: MyPlayerConfigService,
    private _custPlayersService:GetCustodianPlayersByTeamIdService) {

    if (this.navParams.get("SelectedAvatar") == null) {
      this.imagePath = 'avatars/add.svg';
      this.SelectedAvatar = "";
    }
    else {
      this.SelectedAvatar = this.navParams.get("SelectedAvatar");
      this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/" + this.SelectedAvatar;
    }

    this.followedTeams = this.removeDuplicates(this._loginService.getFollowedTeams(),"TeamId");

    this._playerposition.getPositionsList()
      .subscribe(data => {
        this.positions = data;
        //   this.playerposition = this.positions[0].Code;
        //   this.TeamId = -1;
        this.firstName = "";
        this.lastName = "";
        this.Email = "";
        this.JerseyNumber = "";
        this.dataLoading = false;

      })
  }



  goToAddPlayerAvatarPage() {
    let AddPlayerAvatarModal = this.modalCtrl.create(AddPlayerAvatarPage,
      {
        SelectedAvatar: this.SelectedAvatar,
        SelectedTeamId: this.TeamId
      });
    AddPlayerAvatarModal.present();
    AddPlayerAvatarModal.onDidDismiss(data => {
      this.SelectedAvatar = data;
      this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/" + this.SelectedAvatar;
    })
    //  this.navCtrl.push(AddPlayerAvatarPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
    localStorage.setItem('TabIndex', '0');
    localStorage.setItem('homeView', 'players');
    this.viewCtrl.dismiss();
    this.navCtrl.remove(this.viewCtrl.index);
    this.navCtrl.pop();
    //  this.navCtrl.setRoot(MainTabs);
  }

  savePlayer() {
    this.save = 1;
    var FollowupTeams = [];
    localStorage.setItem('homeView', 'players');
    localStorage.setItem('TabIndex', '0');
    console.log(this.validateData());
    if (this.validateData() == true) {

      let _playerData = new PlayerData;
      /*     _playerData.PlayerUserId = 0;
           _playerData.UserId = this._loginService.getUserInfo().Context.User.UserId;          
           _playerData.TeamId = this.TeamId;
           _playerData.Avatar = this.SelectedAvatar;
           _playerData.FirstName = this.firstName;
           _playerData.LastName =  this.lastName;
           _playerData.EmailAddress =  this.Email;
           _playerData.JerseyNumber = this.JerseyNumber;
           _playerData.Position = this.playerposition;
           _playerData.SuspendNotification = 'N';
           _playerData.SuspendAlerts = 'N';
           _playerData.Status='A';
           console.log(_playerData);*/
        console.log(this.SelectedAvatar);
      _playerData.FollowupTeams.push({
        PlayerUserId: this.playerUserId,
        UserId: this._loginService.getUserInfo().Context.User.UserId,
        TeamId: this.TeamId,
        Avatar: this.SelectedAvatar,
        FirstName: this.firstName,
        LastName: this.lastName,
        EmailAddress: this.Email,
        JerseyNumber: this.JerseyNumber,
        Position: this.playerposition,
        SuspendNotification: 'N',
        SuspendAlerts: 'N',
        Status: 'A'
      });
      console.log(_playerData);
      this._saveplayer.savePlayer(_playerData)
        .subscribe(data => {
          console.log(data);
          if (data.IsSuccess == true) {
            console.log(data);
            //     this._loginService.setRegUserTournaments(data.RegUserTournaments);
            this._loginService.setRegUserPlayers(data.RegUserPlayers);
            this.viewCtrl.dismiss();
            //  this.navCtrl.setRoot(MainTabs);         
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Login',
              subTitle: data.Messages[0],
              buttons: [{
                text: 'OK',
                handler: () => {
                  this.Email = '';
                }
              }],
            });
            alert.present();
          }
        })
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
    if ((this.firstName != "") && (this.lastName != "") && (this.TeamId != -1) && (this.Email != "") && (this.save == 1))
      return true;
    else
      return false;
  }
  onPlayerChange(pid){
    console.log(pid);
   
    this.otherCustodiansFollowedPlayers.forEach(player => {
      if(player.PlayerUserId == pid){
              this.newplayer=0;
              console.log(this.newplayer);
              this.playerposition = player.Position;
               this.playerUserId = player.PlayerUserId;
               this.firstName = player.FirstName;
               this.lastName = player.LastName;
               this.Email = player.EmailAddress;
               this.SelectedAvatar = player.Avatar;
               this.JerseyNumber = player.JerseyNumber;
      }
    });
  }
goToNewPlayer(){
               this.playerposition = -1;
               this.firstName = "";
               this.lastName = "";
               this.Email = "";
               this.JerseyNumber = "";
               this.newplayer=1;
}
  onTeamChange() {
   this.teamerror=0;
   this.newplayer=1;
    this.followedPlayers = [];
   this.followedPlayers= this._loginService.getRegUserPlayers();
    console.log(this.followedPlayers);
   this.followedPlayers.forEach(player => {
      if (player.PlayerUserId != 0) {
        if (player.TeamId == this.TeamId) {
            this.TeamId=-1;
            this.teamerror=1;
         /* let alert = this.alertCtrl.create({
            title: 'Add Player',
            subTitle: 'Only 1 Player can be added to a Team',
            buttons: [{
              text: 'OK',
              handler: () => {
              }
            }],
          });
          alert.present();*/
        }
      }
    });
    this._custPlayersService.getPlayersList(this.TeamId,this._loginService.getUserInfo().Context.User.UserId,'BasketBall')
    .subscribe(data =>{
      console.log(data);
      this.otherCustodiansFollowedPlayers = data;
      if (this.otherCustodiansFollowedPlayers==null){
        this.playerUserId =0;
        this.playererror=1;
        this.newplayer=1;
      }
      else
      {
      this.playererror=0; 
       this.newplayer=0;
      }
      
          
    var avatarpath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/";
    this.followedTeams.forEach(team => {
      if (team.TeamId == this.TeamId) {
        this.imagePath = (team.Gender == 'M') ? avatarpath + 'boys/joe.svg' : avatarpath + 'girls/caroline.svg';
        this.SelectedAvatar = (team.Gender == 'M') ? 'boys/joe.svg' : 'girls/caroline.svg';
      }
    });
    })

  }
}
