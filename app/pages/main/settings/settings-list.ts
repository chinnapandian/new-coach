import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
// import {SelectTeamPage} from '../tournament/select-team/select-team';
import {ResetPasswordPage} from '../../auth/reset-password/reset-password';
import {MyPlayerConfigService} from '../../../services/config';
import {LogoutService} from '../../../services/logout';
import {LoginService} from '../../../services/login';
import {LoginPage} from '../../auth/login/login';
import {PrivacyPage} from "./app/privacy/privacy";
import {TermsPage} from "./app/terms/terms";
import {FeedbackPage} from "./app/feedback/feedback";
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
              private _loginService : LoginService) {

     this.userInfo = this._loginService.getUserInfo();
     this.userName = this.userInfo.Context.User.UserName;
  }

  dismiss() {
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

     logOut() {
        this._logoutService.logout()
          .subscribe(data => {
            if (data) {
                this._config.setAuthToken('');
                localStorage.setItem('AdminAuthToken', '');
                this.navCtrl.setRoot(LoginPage);

            } else {
              
            }
          });
    }

  goToPrivacyPage(){
        let modal = this.modalCtrl.create(PrivacyPage);
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
