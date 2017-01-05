import {Page, Modal, ViewController, NavController, Alert, AlertController, LoadingController, Platform} from 'ionic-angular';
import {ForgotPasswordService} from '../../../../services/forgotpassword';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LandingPage} from "../../../auth/landing/landing";


@Page({
  templateUrl: 'build/pages/auth/login/forgot-password/forgot-password.html',
  providers: [ForgotPasswordService],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class ForgotPasswordPage {

  forgotPasswordForm: FormGroup;
  validUser = 'true';
  private Email;

  constructor(private _viewController: ViewController,
    private _navController: NavController,
    private _forgotPasswordService: ForgotPasswordService,
    private platform: Platform,
    private alertCtrl : AlertController,
    private formBuilder: FormBuilder,
    private _LoadingController: LoadingController) {
      
      this.forgotPasswordForm = formBuilder.group({
            Email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]
        });
  }

  presentConfirm() {
    let loader = this._LoadingController.create({
                    content: "<div class='custom-spinner-container'><div class='custom-spinner-box'></div></div>"
        });
        loader.present();
        loader.dismiss();
    if (this.Email.trim().length > 0) {
      this._forgotPasswordService.forgotPassword({ EmailAddress: this.Email })
        .subscribe(data => {
          
          console.log(data);
          if (data) {
            
            let alert = this.alertCtrl.create({
                                            title: 'Password Sent',
                                            subTitle: 'Check your inbox for instructions!',
                                              buttons: [
                                                {
                                                  text: 'Okay',
                                                  role: 'cancel',
                                                  handler: () => {
                                      
                                                    this._navController.push(LandingPage);
                                                  }
                                                }
                                            /*    ,
                                                {
                                                  text: 'Go To Inbox',
                                                  handler: () => {
                                                    window.open("message://", "_system", "location=yes")
                                                    this.platform.exitApp();
                                                  }
                                                }*/
                                                ]     
                                });
                                
                                alert.present();
          } else {
            this.displayError();
          }
        })
    } else {
      this.displayError();
    }


  }

  displayError() {
 
    let alert = this.alertCtrl.create({
      title: 'Error!',
      message: 'Email Address does not match our records',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  close() {
    this._viewController.dismiss();
  }
}
