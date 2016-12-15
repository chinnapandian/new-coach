import {Page, Modal, ViewController, NavController,NavParams,Alert, AlertController} from 'ionic-angular';
import {SettingsService} from '../../../../../services/settings';
import {Injectable} from '@angular/core';
import {LoginService} from '../../../../../services/login';
export class AddAlertsPreferenceData {
  NotificationType;
  ScheduleUpdate;
  ScoreUpdate;
  PracticeUpdate;
  Alerts;
  UserId;
}
@Page({
  templateUrl: 'build/pages/main/settings/app/notifications/notifications.html',
   providers: [SettingsService,AddAlertsPreferenceData]
})

export class NotificationsPage {

   private notificationView: string = 'game';
  private push: boolean = true;
  private email: boolean = true;
  private sms: boolean = false;
  private game: boolean = true;
  private practice: boolean = true;
  private score: boolean = true;
  private userObj;
  constructor(private _viewController: ViewController,
              private _navController: NavController,
              private _navParams: NavParams,
              private _userpreference: SettingsService,
               private _LoginService: LoginService,
               private alertCtrl:AlertController) {
                    this.getUserPreference();
  }

  close() {
    this._viewController.dismiss();
  }
  getUserPreference(){

    this._userpreference.getUserPreference(this._LoginService.getUserInfo().Context.User.UserId)
      .subscribe(data => {
        this.userObj = data;
       
        if (this.userObj.Alerts=="All"){this.push=true; this.email=true ;this.sms= true;}
        if (this.userObj.Alerts=="None"){this.push=false; this.email=false ;this.sms= false;}
        if (this.userObj.Alerts=="Email and Push"){this.push=true; this.email=true ; this.sms= false;}
        if (this.userObj.Alerts=="Push and SMS"){this.push=true; this.sms=true ; this.email= false;}
        if (this.userObj.Alerts=="Email and SMS"){this.sms=true; this.email=true ; this.push= false;}
        if (this.userObj.Alerts=="SMS"){this.push=false; this.email=false ; this.sms= true;}
        if (this.userObj.Alerts=="Email"){this.push=false; this.sms=false ; this.email= true;}
        if (this.userObj.Alerts=="push"){this.email=false; this.sms=false ; this.push= true;}
        if (this.userObj.PracticeUpdate=="N"){this.practice= false;}
        if (this.userObj.ScoreUpdate=="N"){this.score= false;}
        if (this.userObj.ScheduleUpdate=="N"){this.game= false;}
       
      });
  }

  SavePreference(){
        let _AddAlertsPreferenceData = new AddAlertsPreferenceData();
        _AddAlertsPreferenceData.UserId=this._LoginService.getUserInfo().Context.User.UserId;
        _AddAlertsPreferenceData.NotificationType="Alerts";
        if (this.practice==true){
            _AddAlertsPreferenceData.PracticeUpdate='Y';
        }
        else{
            _AddAlertsPreferenceData.PracticeUpdate='N';
        }
        if (this.score==true){
            _AddAlertsPreferenceData.ScoreUpdate='Y';
        }
        else{
            _AddAlertsPreferenceData.ScoreUpdate='N';
        }
        if (this.game==true){
            _AddAlertsPreferenceData.ScheduleUpdate='Y';
        }
        else{
            _AddAlertsPreferenceData.ScheduleUpdate='N';
        }
        if (this.push==true && this.email== true && this.sms== true){
            _AddAlertsPreferenceData.Alerts="All";
        }
        else if(this.push==false && this.email==false && this.sms== false){
            _AddAlertsPreferenceData.Alerts="None";
        }
        else if(this.push==true && this.email==true && this.sms== false){
            _AddAlertsPreferenceData.Alerts="Email and Push";
        }
        else if(this.push==true && this.sms==true && this.email== false){
            _AddAlertsPreferenceData.Alerts="Push and SMS";
        }
        else if(this.sms==true && this.email==true && this.push== false){
            _AddAlertsPreferenceData.Alerts="Email and SMS";
        }
        else if(this.push==false && this.email==false && this.sms== true){
            _AddAlertsPreferenceData.Alerts="SMS";
        }
        else if(this.push==false && this.sms==false && this.email== true){
            _AddAlertsPreferenceData.Alerts="Email";
        }
        else{
            _AddAlertsPreferenceData.Alerts="push";
        }
       
        this._userpreference.saveUserPreference(_AddAlertsPreferenceData)
         .subscribe(data => {
            let alert = this.alertCtrl.create({
                                                        title: 'Alerts',
                                                        subTitle:  'Saved sucessfully.',
                                                        buttons:[{
                                                            text : 'Close',
                                                            role: 'cancel',
                                                            handler: () => {
                                                                this._viewController.dismiss();
                                                            }
                                                            }],     
                                                    });
                                                alert.present();
                }); 
  }
   dismiss() {
    this._viewController.dismiss();
  }
} // end class
