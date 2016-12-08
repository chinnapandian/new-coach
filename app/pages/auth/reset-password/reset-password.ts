import {Page, Modal, ViewController, NavController, Alert,AlertController} from 'ionic-angular';
import {SettingsService} from '../../../services/settings';
import {MyPlayerConfigService} from  '../../../services/config';


@Page({
  templateUrl: 'build/pages/auth/reset-password/reset-password.html',
  providers : [ SettingsService]
})

export class ResetPasswordPage {

  private newPassword;
  private verifyPassword;
  private oldPassword;
  private emailAddress;
  private password;

  constructor(
    private _viewController: ViewController,
    private _settingsService: SettingsService,
    private _navController: NavController,
    private _config: MyPlayerConfigService,
    private alertCtrl:AlertController) {
        console.log("Reset Password Page");
        this.emailAddress = localStorage.getItem('Email');
        this.password = localStorage.getItem("Password");
        console.log(this.emailAddress);
  }


  resetPassword() {
      var queryParam = {
      "EmailAddress": this.emailAddress,
      "ConfirmPassword": this.verifyPassword,
      "NewPassword": this.newPassword,
      "OldPassword": this.oldPassword
    };
    console.log(this.password);
    console.log(this.oldPassword);
   if (this.newPassword && this.verifyPassword && this.oldPassword) {
        if(this.validatePassword(this.password, this.oldPassword)){
                if (this.validatePassword(this.newPassword, this.verifyPassword)) {
                        this._settingsService.resetPassword(queryParam)
                                .subscribe(
                                data => {
                                console.log('Success :' + data);

                                if (data) {
                                    let alert = this.alertCtrl.create({
                                            title: 'Success!',
                                            subTitle: 'Your password has been reset!',
                                            buttons:[{
                                                text : 'OK',
                                                handler: () => {
                                                    this._viewController.dismiss();
                                                }
                                                }],     
                                        });
                                        alert.present();
                                }
                                });
                    }
                    else {

                                    let alert = this.alertCtrl.create({
                                            title: 'Error',
                                            subTitle: 'Mismatch in new password',
                                            buttons:[{
                                                text : 'OK',
                                                handler: () => {
                                                    
                                                }
                                                }],     
                                        });
                                    alert.present();
                                }
                }
             else {

                                    let alert = this.alertCtrl.create({
                                            title: 'Error',
                                            subTitle: 'Retype current Password',
                                            buttons:[{
                                                text : 'OK',
                                                handler: () => {
                                                    
                                                }
                                                }],     
                                        });
                                    alert.present();
                                }
          }
          else {

                                    let alert = this.alertCtrl.create({
                                            title: 'Error',
                                            subTitle: 'Please enter password',
                                            buttons:[{
                                                text : 'OK',
                                                handler: () => {
                                                    
                                                }
                                                }],     
                                        });
                                    alert.present();
                                }
    }

  setFocus(input) {
    input.setFocus();
  }

  validatePassword(password,confirmpassword){
      console.log(password);
      console.log(confirmpassword);
        if (password === confirmpassword) {
            return true;
            }
            else {
            return false;
            }
  }

 dismiss() {
    this._viewController.dismiss();
  }

  close() {
    this._viewController.dismiss();
  }
}

