import {Component} from '@angular/core';
import {App, NavController, ViewController, ModalController, NavParams, LoadingController} from 'ionic-angular';
// import {SelectTeamPage} from '../tournament/select-team/select-team';
import {ResetPasswordPage} from '../../auth/reset-password/reset-password';
import {MyPlayerConfigService} from '../../../services/config';
import {LogoutService} from '../../../services/logout';
import {LoginService} from '../../../services/login';
import {HomePage} from '../../main/home/home';
import {LandingPage} from '../../auth/landing/landing';
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

     this.userInfo = this._loginService.getUserInfo();
     this.userName = this.userInfo.Context.User.UserName;
  }

  dismiss() {
    var t = this.navCtrl.parent;
    t.select(0);
    this.navCtrl.setRoot(HomePage);
    
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
     let loader = this.loadingCtrl.create({
                    content: "<div class='custom-spinner-container'><div class='custom-spinner-box'></div></div>"
        });
    loader.present();
        this._logoutService.logout()
          .subscribe(data => {
                loader.dismiss();                
                localStorage.clear();
                this._config.setDeviceId(this._config.getDeviceId());
                this._config.setDevice(this._config.getDevice());
                this._config.setRegistrationId(this._config.getRegistrationId());
                this.appCtrl.getRootNav().push(LandingPage);
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
