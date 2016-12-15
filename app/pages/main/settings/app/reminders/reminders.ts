import {Page, Modal, ViewController, NavController,NavParams,Alert, AlertController} from 'ionic-angular';
import {SettingsService} from '../../../../../services/settings';
import {LoginService} from '../../../../../services/login';
export class AddRemindersPreferenceData {
  NotificationType;
  Reminder1unit;
  Reminder2unit;
  Reminder3unit;
  Reminder1value;
  Reminder2value;
  Reminder3value;
  Reminders;
  GameSchedule;
  PracticeSchedule;
  UserId;
}
@Page({
  templateUrl: 'build/pages/main/settings/app/reminders/reminders.html',
   providers: [SettingsService,AddRemindersPreferenceData]
})

export class RemindersPage {
  private timeView: string = 'minutes';
  // private timeView2: string = 'minutes';
  // private timeView3: string = 'minutes';
  private games: boolean = true;
  private practices: boolean = true;
  private push: boolean = true;
  private sms: boolean=true;
  private email: boolean=true;
  private h5: boolean = false;
  private h1: boolean = false;
  private h3: boolean = false;
  private h12: boolean = false;
  private d1: boolean = false;
  private d2: boolean = false;
  private d3: boolean = false;
  private w1: boolean = false;
  private m30: boolean =false;
  private m45: boolean=false;
private userObj;
  constructor(private _viewController: ViewController,
              private _navController: NavController ,
               private _navParams: NavParams,
              private _userpreference: SettingsService,
               private _LoginService: LoginService,
               private alertCtrl :AlertController) {
                 this.getUserPreferenceReminders();
  }

   getUserPreferenceReminders() {
     this._userpreference.getUserPreference(this._LoginService.getUserInfo().Context.User.UserId)
      .subscribe(data => {
        this.userObj = data;
        console.log(data);
        if (this.userObj.Reminders=="All"){this.push=true; this.email=true;this.sms= true;}
        if (this.userObj.Reminders=="None"){this.push=false; this.email=false;this.sms= false;}
        if (this.userObj.Reminders=="Email and Push"){this.push=true; this.email=true ; this.sms= false;}
        if (this.userObj.Reminders=="Push and SMS"){this.push=true; this.sms=true ; this.email= false;}
        if (this.userObj.Reminders=="Email and SMS"){this.sms=true; this.email=true ; this.push= false;}
        if (this.userObj.Reminders=="SMS"){this.push=false; this.email=false ; this.sms= true;}
        if (this.userObj.Reminders=="Email"){this.push=false; this.sms=false ; this.email= true;}
        if (this.userObj.Reminders=="push"){this.email=false; this.sms=false ; this.push= true;}
        if (this.userObj.PracticeSchedule=="N"){this.practices= false;}
        if (this.userObj.GameSchedule=="N"){this.games= false;}
       if (this.userObj.Reminder1unit=="Mins")
       {
          if (this.userObj.Reminder1value==30){this.m30=true;}else{this.m45=true;}
        }
         else if (this.userObj.Reminder1unit=="Hours")
       {
          if (this.userObj.Reminder1value==1){this.h1=true;}
          else if(this.userObj.Reminder1value==3){this.h3=true;}
          else if(this.userObj.Reminder1value==5){this.h5=true;}
          else{this.h12=true;}
        }
         else if (this.userObj.Reminder1unit=="Days"){
          if (this.userObj.Reminder1value==1){this.d1=true;}
          else if(this.userObj.Reminder1value==2){this.d2=true;}
          else if(this.userObj.Reminder1value==3){this.d3=true;}
          else{this.w1=true;}
         }
         if (this.userObj.Reminder2unit=="Mins")
       {
          if (this.userObj.Reminder2value==30){this.m30=true;}else{this.m45=true;}
        }
         else if (this.userObj.Reminder2unit=="Hours")
       {
          if (this.userObj.Reminder2value==1){this.h1=true;}
          else if(this.userObj.Reminder2value==3){this.h3=true;}
          else if(this.userObj.Reminder2value==5){this.h5=true;}
          else{this.h12=true;}
        }
         else if (this.userObj.Reminder2unit=="Days"){
          if (this.userObj.Reminder2value==1){this.d1=true;}
          else if(this.userObj.Reminder2value==2){this.d2=true;}
          else if(this.userObj.Reminder2value==3){this.d3=true;}
          else{this.w1=true;}
         }
         if (this.userObj.Reminder3unit=="Mins")
       {
          if (this.userObj.Reminder3value==30){this.m30=true;}else{this.m45=true;}
        }
         else if (this.userObj.Reminder3unit=="Hours")
       {
          if (this.userObj.Reminder3value==1){this.h1=true;}
          else if(this.userObj.Reminder3value==3){this.h3=true;}
          else if(this.userObj.Reminder3value==5){this.h5=true;}
          else{this.h12=true;}
        }
         else if (this.userObj.Reminder3unit=="Days"){
          if (this.userObj.Reminder3value==1){this.d1=true;}
          else if(this.userObj.Reminder3value==2){this.d2=true;}
          else if(this.userObj.Reminder3value==3){this.d3=true;}
          else{this.w1=true;}
         }
      });
   }
  SavePreference(){
        let _AddRemindersPreferenceData = new AddRemindersPreferenceData();
        _AddRemindersPreferenceData.Reminder1unit='';
         _AddRemindersPreferenceData.Reminder2unit='';
          _AddRemindersPreferenceData.Reminder3unit='';
        _AddRemindersPreferenceData.UserId=this._LoginService.getUserInfo().Context.User.UserId;
        _AddRemindersPreferenceData.NotificationType="Reminders";
        if (this.practices==true){
            _AddRemindersPreferenceData.PracticeSchedule='Y'
        }
        else{
            _AddRemindersPreferenceData.PracticeSchedule='N'
        }
      
        if (this.games==true){
            _AddRemindersPreferenceData.GameSchedule='Y'
        }
        else{
            _AddRemindersPreferenceData.GameSchedule='N'
        }
        if (this.push==true && this.email==true && this.sms== true){
            _AddRemindersPreferenceData.Reminders="All"
        }
        else if(this.push==false&& this.email==false && this.sms== false){
            _AddRemindersPreferenceData.Reminders="None"
        }
        else if(this.push==true && this.email==true && this.sms== false){
            _AddRemindersPreferenceData.Reminders="Email and Push"
        }
        else if(this.push==true&& this.sms==true && this.email== false){
            _AddRemindersPreferenceData.Reminders="Push and SMS";
        }
        else if(this.sms==true&& this.email==true && this.push== false){
            _AddRemindersPreferenceData.Reminders="Email and SMS";
        }
        else if(this.push==false&& this.email==false && this.sms== true){
            _AddRemindersPreferenceData.Reminders="SMS";
        }
        else if(this.push==false&& this.sms==false && this.email== true){
            _AddRemindersPreferenceData.Reminders="Email";
        }
        else{
            _AddRemindersPreferenceData.Reminders="push";
        }
        
  if (this.m30== true &&  _AddRemindersPreferenceData.Reminder1unit=='' ) {_AddRemindersPreferenceData.Reminder1value=30;_AddRemindersPreferenceData.Reminder1unit='Mins'};
  if (this.m45== true ) 
  {
    if (_AddRemindersPreferenceData.Reminder1unit==''){_AddRemindersPreferenceData.Reminder1value=45;_AddRemindersPreferenceData.Reminder1unit='Mins';}
     else{_AddRemindersPreferenceData.Reminder2value=45;_AddRemindersPreferenceData.Reminder2unit='Mins';}
}
if (this.h1== true ) 
  {
    
    if (_AddRemindersPreferenceData.Reminder1unit==''){
      
      _AddRemindersPreferenceData.Reminder1value=1;
      _AddRemindersPreferenceData.Reminder1unit='Hours';
     
    }
     else if (_AddRemindersPreferenceData.Reminder2unit=='') {_AddRemindersPreferenceData.Reminder2value=1;_AddRemindersPreferenceData.Reminder2unit='Hours';}
       else if (_AddRemindersPreferenceData.Reminder3unit=='') {_AddRemindersPreferenceData.Reminder3value=1;_AddRemindersPreferenceData.Reminder3unit='Hours';}
}
if (this.h3== true ) 
  {
    if (_AddRemindersPreferenceData.Reminder1unit==''){_AddRemindersPreferenceData.Reminder1value=3;_AddRemindersPreferenceData.Reminder1unit='Hours';}
     else if (_AddRemindersPreferenceData.Reminder2unit=='') {_AddRemindersPreferenceData.Reminder2value=3;_AddRemindersPreferenceData.Reminder2unit='Hours';}
       else if (_AddRemindersPreferenceData.Reminder3unit=='') {_AddRemindersPreferenceData.Reminder3value=3;_AddRemindersPreferenceData.Reminder3unit='Hours';}
}
if (this.h5== true ) 
  {
    if (_AddRemindersPreferenceData.Reminder1unit==''){_AddRemindersPreferenceData.Reminder1value=5;_AddRemindersPreferenceData.Reminder1unit='Hours';}
     else if (_AddRemindersPreferenceData.Reminder2unit=='') {_AddRemindersPreferenceData.Reminder2value=5;_AddRemindersPreferenceData.Reminder2unit='Hours';}
       else if (_AddRemindersPreferenceData.Reminder3unit=='') {_AddRemindersPreferenceData.Reminder3value=5;_AddRemindersPreferenceData.Reminder3unit='Hours';}
}
if (this.h12== true ) 
  {
    if (_AddRemindersPreferenceData.Reminder1unit==''){_AddRemindersPreferenceData.Reminder1value=12;_AddRemindersPreferenceData.Reminder1unit='Hours';}
     else if (_AddRemindersPreferenceData.Reminder2unit=='') {_AddRemindersPreferenceData.Reminder2value=12;_AddRemindersPreferenceData.Reminder2unit='Hours';}
       else if (_AddRemindersPreferenceData.Reminder3unit=='') {_AddRemindersPreferenceData.Reminder3value=12;_AddRemindersPreferenceData.Reminder3unit='Hours';}
}
if (this.d1== true ) 
  {
    if (_AddRemindersPreferenceData.Reminder1unit==''){_AddRemindersPreferenceData.Reminder1value=1;_AddRemindersPreferenceData.Reminder1unit='Days';}
     else if (_AddRemindersPreferenceData.Reminder2unit=='') {_AddRemindersPreferenceData.Reminder2value=1;_AddRemindersPreferenceData.Reminder2unit='Days';}
       else if (_AddRemindersPreferenceData.Reminder3unit=='') {_AddRemindersPreferenceData.Reminder3value=1;_AddRemindersPreferenceData.Reminder3unit='Days';}
}
if (this.d2== true ) 
  {
    if (_AddRemindersPreferenceData.Reminder1unit==''){_AddRemindersPreferenceData.Reminder1value=2;_AddRemindersPreferenceData.Reminder1unit='Days';}
     else if (_AddRemindersPreferenceData.Reminder2unit=='') {_AddRemindersPreferenceData.Reminder2value=2;_AddRemindersPreferenceData.Reminder2unit='Days';}
       else if (_AddRemindersPreferenceData.Reminder3unit=='') {_AddRemindersPreferenceData.Reminder3value=2;_AddRemindersPreferenceData.Reminder3unit='Days';}
}
if (this.d3== true ) 
  {
    if (_AddRemindersPreferenceData.Reminder1unit==''){_AddRemindersPreferenceData.Reminder1value=3;_AddRemindersPreferenceData.Reminder1unit='Days';}
     else if (_AddRemindersPreferenceData.Reminder2unit=='') {_AddRemindersPreferenceData.Reminder2value=3;_AddRemindersPreferenceData.Reminder2unit='Days';}
       else if (_AddRemindersPreferenceData.Reminder3unit=='') {_AddRemindersPreferenceData.Reminder3value=3;_AddRemindersPreferenceData.Reminder3unit='Days';}
}
if (this.w1== true ) 
  {
    if (_AddRemindersPreferenceData.Reminder1unit==''){_AddRemindersPreferenceData.Reminder1value=7;_AddRemindersPreferenceData.Reminder1unit='Days';}
     else if (_AddRemindersPreferenceData.Reminder2unit=='') {_AddRemindersPreferenceData.Reminder2value=7;_AddRemindersPreferenceData.Reminder2unit='Days';}
       else if (_AddRemindersPreferenceData.Reminder3unit=='') {_AddRemindersPreferenceData.Reminder3value=7;_AddRemindersPreferenceData.Reminder3unit='Days';}
}
 this._userpreference.saveUserPreference(_AddRemindersPreferenceData)
         .subscribe(data => {
            let alert = this.alertCtrl.create({
                                                        title: 'Reminders',
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
}
