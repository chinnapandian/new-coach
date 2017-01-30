import {Page, Modal, ViewController, NavController, AlertController, LoadingController, Alert} from 'ionic-angular';
import {ResetPasswordPage} from '../../../../auth/reset-password/reset-password';
import {SettingsService} from '../../../../../services/settings';
import {LoginService} from '../../../../../services/login';
import {TelCarriersListService} from '../../../../../services/telcarrierslist';

@Page({
  templateUrl: 'build/pages/main/settings/app/profile/profile.html',
  providers: [SettingsService,TelCarriersListService]
})

export class ProfilePage {

  private firstName = '';
  private lastName = '';
  private email = '';
  private phoneCarrier = '';
  private phoneNumber = '';
  private userObj;
  private telcarriers = [];
  private CarrierId;
  private CarrierName;

  constructor(private _viewController: ViewController,
    private _navController: NavController,
    private _settingsService: SettingsService,
    private _loginService: LoginService,
    private alertCtrl : AlertController,
    private _telCarriers:TelCarriersListService,
    private _loadingCtrl : LoadingController) {
    
  
    this.getProfile();
     this._telCarriers.getTelCarriersList()
          .subscribe(data => {
               this.telcarriers=data;             
      }); 

  }

  goToResetPassword() {
    this._navController.push(ResetPasswordPage);
  }

  getProfile() {
    this._settingsService.getProfile(this._loginService.getUserInfo().Context.User.UserId)
      .subscribe(data => {
        console.log(data);
        this.userObj = data;
        this.firstName = this.userObj.FirstName;
        this.lastName = this.userObj.LastName;
        this.phoneNumber = this.userObj.Phone;
        this.email = this.userObj.EmailAddress;
        this.CarrierId=this.userObj.CarrierId;
      });
  }

  save() {
    this.userObj.FirstName = this.firstName;
    this.userObj.LastName = this.lastName;
    this.userObj.Phone = this.phoneNumber;
    this.userObj.EmailAddress = this.email;
    this.userObj.CarrierId= (this.CarrierId==null?0:this.CarrierId);
    console.log(this.userObj);
    this._settingsService.saveProfile(this.userObj)
    .subscribe(data => { 
      console.log(data);
      if(data ==1){
         localStorage.setItem("UserName",(this.firstName+ " "+  this.lastName));  
      }
      let title = '';
      let msg = '';

      if(data === 1) {
        title = 'Success!';
        msg = 'User profile updated successfully.';
      } else { 
        title = 'Error!';
        msg = 'Error while updating user profile.';
      }
        let alert = this.alertCtrl.create({
                                            title: title,
                                            subTitle: msg,
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

onChangeCarrier(SelectedValue, SelectedName){
      this.CarrierId = parseInt(SelectedValue);
      this.CarrierName = SelectedName._text;
      console.log(this.CarrierId);
      console.log(this.CarrierName);
}

close() {
    this._viewController.dismiss();
  }
} // end class
