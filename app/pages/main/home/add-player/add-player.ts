import {Component,Injectable} from '@angular/core';
import {NavController, ViewController, ModalController, AlertController, NavParams} from 'ionic-angular';
import {AddPlayerAvatarPage} from "./add-avatar/add-avatar";
import {LoginService} from '../../../../services/login';
import {PlayerPositionListService} from  '../../../../services/getplayerposition';
import {SavePlayerService} from  '../../../../services/saveplayer';
import {MyPlayerConfigService} from  '../../../../services/config';
import {TitlePipe} from  '../../../../pipes/title';
import {AvatarsListService} from  '../../../../services/getavatars';
import {MainTabs} from "../../../main/tabs/main-tabs";

@Injectable()
export class PlayerData {
  UserId;
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
  SelectedAvatar;
}

@Component({
  templateUrl: 'build/pages/main/home/add-player/add-player.html',
  providers : [PlayerPositionListService, SavePlayerService, AvatarsListService],
  pipes : [TitlePipe]
})

export class AddPlayerPage {
  private followedTeams = [];
  private positions = [];
  private playerposition;
  private TeamId;
  private TeamName;
  private JerseyNumber;
  private dataLoading=true;
  private firstName;
  private lastName;
  private Email;
  private save=0;
  private playerUserId;
  private SelectedAvatar;
  private imagePath;
  private boyavatars = [];
  private girlavatars = [];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private _loginService : LoginService,
      private _playerposition : PlayerPositionListService,
      private _saveplayer : SavePlayerService,
      private alertCtrl : AlertController,
      private avatars : AvatarsListService,
      private navParams : NavParams,
      private _config: MyPlayerConfigService) {

        this.SelectedAvatar = (this.navParams.get("SelectedAvatar")==null?"joe.svg":this.navParams.get("SelectedAvatar"));
        this.getImagePath();
        this.followedTeams = this._loginService.getFollowedTeams();
        this._playerposition.getPositionsList()
        .subscribe(data => {
          this.positions = data;
          this.playerposition = this.positions[0].Code;
          this.TeamId = -1;
          this.firstName="";
          this.lastName="";
          this.Email="";
          this.JerseyNumber="";
          this.dataLoading=false;
          
        })      
  }

  getImagePath(){

    var gender='';
    this.avatars.getAvatarsList("boys")
        .subscribe(data =>{
            this.boyavatars = data;
            this.boyavatars.forEach(avatar => {
            if(avatar == this.SelectedAvatar){
              gender='boys'; 
            }      
            });
            gender = (gender=='')?'girls':'boys';
            this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/" + gender + "/";
            console.log(this.imagePath);
        })  
  }

  goToAddPlayerAvatarPage(){
   let AddPlayerAvatarModal = this.modalCtrl.create(AddPlayerAvatarPage);
   AddPlayerAvatarModal.present();
   AddPlayerAvatarModal.onDidDismiss(data =>
   {
     this.SelectedAvatar = data;
   })
  //  this.navCtrl.push(AddPlayerAvatarPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(MainTabs);
  }

 savePlayer(){
   this.save=1;
   console.log(this.validateData());
   if(this.validateData()==true)
   {
   
      let _playerData = new PlayerData;
              _playerData.PlayerUserId = 0;
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
              console.log(_playerData);
              this._saveplayer.savePlayer(_playerData)
              .subscribe(data => {
                console.log(data);
                if(data.IsSuccess==true)
                  {
                      console.log(data);
                      this._loginService.setRegUserTournaments(data.RegUserTournaments);
                      this._loginService.setRegUserPlayers(data.RegUserPlayers); 
                      this.navCtrl.setRoot(MainTabs);         
                  }
                  else
                  {
                      let alert = this.alertCtrl.create({
                                        title: 'Login',
                                        subTitle: data.Messages[0],
                                        buttons:[{
                                            text : 'OK',
                                            handler: () => {
                                              this.Email='';
                                              }
                                            }],     
                                      });
                      alert.present();
                  } 
              })
   }    
  }

  validateData(){
    if((this.firstName!="")&&(this.lastName!="")&&(this.TeamId!=-1)&&(this.Email!="")&&(this.save==1))
      return true;
    else
      return false;
  }
}
