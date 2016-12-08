import {Component,Injectable} from '@angular/core';
import {NavController, ViewController, ModalController, AlertController} from 'ionic-angular';
import {UpdatePlayerAvatarPage} from "./update-avatar/update-avatar";
import {LoginService} from '../../../../services/login';
import {PlayerPositionListService} from  '../../../../services/getplayerposition';
import {SavePlayerService} from  '../../../../services/saveplayer';
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
}

@Component({
  templateUrl: 'build/pages/main/home/update-player/update-player.html',
  providers : [PlayerPositionListService, SavePlayerService]
})

export class UpdatePlayerPage {
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
  private reminders: boolean;
  private alerts: boolean;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private _loginService : LoginService,
      private _playerposition : PlayerPositionListService,
      private _saveplayer : SavePlayerService,
      private alertCtrl : AlertController) {

        this.playerUserId = (localStorage.getItem("SelectedPlayerId")!=null?localStorage.getItem("SelectedPlayerId"):0);
        this.followedTeams = this._loginService.getFollowedTeams();
        this._playerposition.getPositionsList()
        .subscribe(data => {
              this.positions = data;
              this.fillPlayerData();
              this.dataLoading=false;
        })

      
  }

  fillPlayerData(){
    console.log(this.playerUserId);
    this.followedTeams.forEach(team => {
            if(team.PlayerUserId == this.playerUserId){
               this.playerposition = team.Position;
               this.TeamId = team.TeamId;
               this.firstName = team.FirstName;
               this.lastName = team.LastName;
               this.Email = team.EmailAddress;
               this.JerseyNumber = team.JerseyNumber;
               this.alerts=(team.SuspendAlerts==""||team.SuspendAlerts=='N')?false:true;
               this.reminders=(team.SuspendNotification==""||team.SuspendNotification=='N')?false:true;

            }
          });
  }

  goToUpdatePlayerAvatarPage(){
    this.navCtrl.push(UpdatePlayerAvatarPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

 savePlayer(status){
   this.save=1;
   console.log(this.validateData());
   if(this.validateData()==true)
   {
   
      let _playerData = new PlayerData;
              _playerData.PlayerUserId = parseInt(this.playerUserId);
              _playerData.UserId = this._loginService.getUserInfo().Context.User.UserId;          
              _playerData.TeamId = this.TeamId;
              _playerData.Avatar = "test";
              _playerData.FirstName = this.firstName;
              _playerData.LastName =  this.lastName;
              _playerData.EmailAddress =  this.Email;
              _playerData.JerseyNumber = this.JerseyNumber;
              _playerData.Position = this.playerposition;
              _playerData.SuspendAlerts=(this.alerts==false)?'N':'Y';
              _playerData.SuspendNotification=(this.reminders==false)?'N':'Y';
              _playerData.Status=status.substring(0,1);
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
                                              localStorage.setItem("SelectedPlayerId",null);
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