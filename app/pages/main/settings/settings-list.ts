import {Component} from '@angular/core';
import {App, NavController, ViewController, ModalController, NavParams, LoadingController} from 'ionic-angular';
// import {SelectTeamPage} from '../tournament/select-team/select-team';
import {ResetPasswordPage} from '../../auth/reset-password/reset-password';
import {MyPlayerConfigService} from '../../../services/config';
import {LogoutService} from '../../../services/logout';
import {LoginService} from '../../../services/login';
import {HomePage} from '../../main/home/home';
import {LandingPage} from '../../auth/landing/landing';
import {MainTabs} from '../../main/tabs/main-tabs';
import {PrivacyPage} from "./app/privacy/privacy";
import {ProfilePage} from "./app/profile/profile";
import {TermsPage} from "./app/terms/terms";
import {FeedbackPage} from "./app/feedback/feedback";
import {RemindersPage} from "./app/reminders/reminders";
import {NotificationsPage} from "./app/notifications/notifications";
import {FAQPage} from "./app/faq/faq";



@Component({
  templateUrl: 'build/pages/main/settings/settings-list.html',
  providers: [LogoutService]
})

export class SettingsListPage {

  // Defining variable
  private tournamentView: string = 'ongoing';
  private userInfo;
  private userName;
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private navParams : NavParams,
              private _config: MyPlayerConfigService,
              private _logoutService: LogoutService,
              private _loginService : LoginService,
              private appCtrl : App,
              private loadingCtrl:LoadingController) {
    localStorage.setItem("TabIndex","3"); 
  }

  ionViewDidEnter(){
    console.log("test");
    this.userName = localStorage.getItem("UserName");
    console.log(this.userName);
  }

  dismiss() {
    var t = this.navCtrl.parent;
    t.select(0);
   // this.navCtrl.setRoot(HomePage);
   this.viewCtrl.dismiss();
    
  }

   goToResetPasswordPage() {
       console.log("resetpassword");
       let modal = this.modalCtrl.create(ResetPasswordPage,
       {
         UserInfo : this.userInfo
       });
        modal.present();
    }

   goToProfile(){
      console.log("Profilepage");
      let modal = this.modalCtrl.create(ProfilePage,
       {
         UserInfo : this.userInfo
       });
        modal.present();
   }
  
  logOut() {
             
             // this.navCtrl.setRoot(MainTabs);
              // this.viewCtrl.dismiss();
                            
               
                

     let loader = this.loadingCtrl.create({
                    content: "<div class='custom-spinner-container'><div class='custom-spinner-box'></div></div>"
        });
    loader.present();
        this._logoutService.logout()
          .subscribe(data => {
                 var deviceid = this._config.getDeviceId();
                var device = this._config.getDevice();
                var regid = this._config.getRegistrationId();
                localStorage.clear(); 
             //   console.log("settingspage"+this._config.getAuthToken());  
                console.log("settingspage"+localStorage.getItem('AuthToken'));    
                localStorage.setItem("device", device);
                localStorage.setItem("deviceId", deviceid);
                localStorage.setItem("registrationId", regid);       
            //    this._config.setDeviceId(deviceid);
            //    this._config.setDevice(device);
            //    this._config.setRegistrationId(regid); 
                loader.dismiss();
                this.viewCtrl.dismiss();           
                this.appCtrl.getRootNav().setRoot(LandingPage);
          });

    }

  goToPrivacyPage(){
        let modal = this.modalCtrl.create(PrivacyPage);
        modal.present();
  }
 goToRemindersPage(){
        let modal = this.modalCtrl.create(RemindersPage);
        modal.present();
  }
   goToNotificationsPage(){
        let modal = this.modalCtrl.create(NotificationsPage);
        modal.present();
  }
  goToFeedbackPage(){
        let modal = this.modalCtrl.create(FeedbackPage);
        modal.present();
  }

    goToTermsPage(){
       let modal = this.modalCtrl.create(TermsPage);
        modal.present();
  }

    goToFAQPage(){
        let modal = this.modalCtrl.create(FAQPage);
        modal.present();
  }

}
