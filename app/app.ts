import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/auth/login/login';
import {HomePage} from './pages/main/home/home';
import {LandingPage} from './pages/auth/landing/landing'
import {PurchaseEventPage} from './pages/main/events/purchase/event/purchase-event'
import {RootPage} from './pages/root-page/root-page'
import {RecordStatsPage} from './pages/record-stats/record-stats'
import {MainTabs} from './pages/main/tabs/main-tabs'
import {EventSchedulePage} from './pages/main/events/event/event-schedule/schedule'
// import {SelectedPlayerPage} from 'pages/main/my-players/selected-player/tabs'
import {MyPlayerConfigService} from './services/config';
import {Device, Cordova} from 'ionic-native';
import {Push} from 'ionic-native';
import {LoginService} from  './services/login';
declare var cordova,window;

class SessionData{
   DeviceId;
   AppId;
   RegistrationId;
   AuthenticationToken;
}

@Component({
  templateUrl: 'build/pages/root-page/root-page.html',
  providers: [
    MyPlayerConfigService, LoginService
  ],
})

export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform,
              private _config: MyPlayerConfigService) {
    
    this.rootPage = LandingPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
   
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
      //check for the session of the user
    //  localStorage.setItem("device", Device.device.platform);
    //  localStorage.setItem("deviceId", Device.device.uuid);
      this._config.setDeviceId(Device.device.uuid);
      this._config.setDevice(Device.device.platform);
      this._config.setRegistrationId('');
      var push = Push.init({
        android: {
          senderID: "908682344630"
        },
         ios: {
          alert: "true",
          badge: true,
          sound: 'false'
        },
        windows: {}
      });
      if (push) {
        push.on('registration', (data) => {
       //   localStorage.setItem("registrationId", data.registrationId);
          this._config.setRegistrationId(data.registrationId);
        });
        push.on('notification', (data) => {
          console.log(data);
          alert(data.message);

        });
        push.on('error', (e) => {
          console.log(e.message);
        });
      } else {
        console.error('Error while initializing Push plugin.')
      }
    });
           
    console.log(Device.device.uuid);
    console.log(Device.device.platform);
   
      
    if(this._config.getAuthToken()==null || this._config.getAuthToken()=='')    
          this.rootPage = LandingPage;
     else
          this.rootPage = MainTabs;
  }


}
ionicBootstrap(MyApp, [ MyPlayerConfigService, LoginService ]);