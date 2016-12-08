import {Component, Injectable} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, ViewController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {MyPlayerConfigService} from '../../../../services/config';
import {MainTabs} from "../../../main/tabs/main-tabs";
import {SignupService} from '../../../../services/signup';
import {LoginService} from '../../../../services/login';
import {LandingPage} from "../../../auth/landing/landing";

@Injectable()
export class SignupData {
    FirstName;
    LastName;
    EmailAddress;
    Password;
    AppId;
    RegistrationId;
    DeviceId;
    Device;
    Authtoken;
}

@Component({
  templateUrl: 'build/pages/auth/signup/get-email/get-email.html',
  providers:[SignupService,SignupData],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class GetEmailPage {
  
  getEmailForm: FormGroup;

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private navParams : NavParams,
              private _LoginService: LoginService,
              private _signupService:SignupService,
              private _signupData : SignupData,
              private _config: MyPlayerConfigService,
              private alertCtrl : AlertController,
              private loadingCtrl : LoadingController) {

   this.getEmailForm = formBuilder.group({
        Email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        Password: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
    });
  }

  goToMyTeamsPage(){

    this._signupData.FirstName =  this.navParams.get("FirstName");
    this._signupData.LastName =  this.navParams.get("LastName");
    this._signupData.EmailAddress =  this.getEmailForm.controls['Email'].value;
    this._signupData.Password = this.getEmailForm.controls['Password'].value;
    this._signupData.DeviceId = localStorage.getItem('deviceId');
    this._signupData.Device = localStorage.getItem('device');
    this._signupData.AppId = 'myLudus PlayerWatch';
    this._signupData.RegistrationId = localStorage.getItem('registrationId');
    this._signupData.Authtoken = '';
    this._config.setDeviceId(this._signupData.DeviceId);
    this._LoginService.setLoginData(this._signupData);
    console.log(this._signupData);

    let loader = this.loadingCtrl.create({
                    content: "<div class='custom-spinner-container'><div class='custom-spinner-box'></div></div>"
        });
    loader.present();

    this._signupService.signUp(this._signupData)      
        .subscribe(data => {
          loader.dismiss();
          if(data.IsSuccess==true)
          {
              console.log(data);
              this._config.setAuthToken(data.AuthToken);
              this._config.setUserNamePassword(this.getEmailForm.controls['Email'].value,this.getEmailForm.controls['Password'].value);
            
              this._LoginService.setUserInfo(data);
              this._LoginService.setRegUserTournaments(data.RegUserTournaments);
              this._LoginService.setRegUserPlayers(data.RegUserPlayers); 
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
                                      loader.dismiss();
                                      this.navCtrl.setRoot(LandingPage);
                                      }
                                    }],     
                              });
               alert.present();
           } 
      }); 
  }

}
