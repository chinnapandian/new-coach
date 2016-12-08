import {Component,Injectable} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, ModalController, ViewController, NavParams, LoadingController,AlertController} from 'ionic-angular';
import {MainTabs} from "../../main/tabs/main-tabs";
import {MyPlayerConfigService} from '../../../services/config';
import {SignupService} from '../../../services/signup';
import {LoginService} from '../../../services/login';
import {LandingPage} from "../../auth/landing/landing";
import {ForgotPasswordPage} from './forgot-password/forgot-password';
import {AddPlayerPage} from '../../../pages/main/home/add-player/add-player';


@Injectable()
export class LoginData {
    EmailAddress;
    Password;
    AppId;
    RegistrationId;
    DeviceId;
    Device;
    Authtoken;
}

@Component({
  templateUrl: 'build/pages/auth/login/login.html',
  providers:[LoginData],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class LoginPage {
  getEmailForm: FormGroup;
  validUser = 'true';
  private Email;
  private Password;
  
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private navParams : NavParams,
              private _loginService: LoginService,
              private _loginData : LoginData,
              private _config: MyPlayerConfigService,
              private alertCtrl : AlertController,
              private loadingCtrl : LoadingController) {

   this.getEmailForm = formBuilder.group({
        Email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        Password: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
    });
  }

  login(){
    this._loginData.EmailAddress =  this.getEmailForm.controls['Email'].value;
    this._loginData.Password = this.getEmailForm.controls['Password'].value;
    this._loginData.DeviceId = localStorage.getItem('deviceId');
    this._loginData.Device = localStorage.getItem('device');
    this._loginData.AppId = 'myLudus PlayerWatch';
    this._loginData.RegistrationId = localStorage.getItem('registrationId');
    this._loginData.Authtoken = '';
    this._config.setDeviceId(this._loginData.DeviceId);
    this._loginService.setLoginData(this._loginData);
    console.log(this._loginData);

    let loader = this.loadingCtrl.create({
                    content: "<div class='custom-spinner-container'><div class='custom-spinner-box'></div></div>"
        });
    loader.present();

    this._loginService.login(this._loginData)      
        .subscribe(data => {
          loader.dismiss();
          if(data.IsSuccess==true)
          {
              console.log(data.AuthToken);
              this._config.setAuthToken(data.AuthToken);
              this._config.setUserNamePassword(this.getEmailForm.controls['Email'].value,this.getEmailForm.controls['Password'].value);
              this.validUser='true';
              this._loginService.setUserInfo(data);
              this._loginService.setRegUserTournaments(data.RegUserTournaments);
              this._loginService.setRegUserPlayers(data.RegUserPlayers); 
              this.navCtrl.setRoot(MainTabs);         
          }
          else
          {
              this.validUser='false';
              this.Email='';
              this.Password='';
              
           } 
      }); 
  }

 goToForgotPassword() {
     this.navCtrl.push(ForgotPasswordPage);
  }

}
