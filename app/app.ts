import { Component, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap, NavController} from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginPage } from './pages/auth/login/login';
import { HomePage } from './pages/main/home/home';
import { LandingPage } from './pages/auth/landing/landing';
import { BlankPage } from './pages/auth/blankpage';
import { PurchaseEventPage } from './pages/main/events/purchase/event/purchase-event'
import { RootPage } from './pages/root-page/root-page'
import { EditStatsPage } from './pages/record-stats/edit-record-stats'
import { MainTabs } from './pages/main/tabs/main-tabs'
import { EventSchedulePage } from './pages/main/events/event/event-schedule/schedule';
import { EventBracketsPage } from './pages/main/events/event/event-brackets/brackets';
import { TempCurrDateService } from './services/tempcurrdate';
// import {SelectedPlayerPage} from 'pages/main/my-players/selected-player/tabs'
import { MyPlayerConfigService } from './services/config';
import { SettingsService } from './services/settings';
import { TelCarriersListService } from './services/telcarrierslist';
import { Device, Cordova } from 'ionic-native';
import { Push } from 'ionic-native';
import { LoginService } from './services/login';
declare var cordova, window;
import { Subscription } from 'rxjs';


class SessionData {
  DeviceId;
  AppId;
  RegistrationId;
  AuthenticationToken;
}

@Component({
  templateUrl: 'build/pages/root-page/root-page.html',
  providers: [
    MyPlayerConfigService, LoginService, TempCurrDateService, SettingsService, TelCarriersListService
  ],
})

export class MyApp {

  public rootPage: any;
  private onResumeSubscription: Subscription;

  constructor(private platform: Platform,
    private _config: MyPlayerConfigService,
    private currdate: TempCurrDateService) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
 
       this.platform.pause.subscribe(() => {
           // alert('[INFO] App paused');
           setTimeout(() => {
            this.rootPage=BlankPage;
          }, 0);
           
        });

        this.platform.resume.subscribe(() => {
           // alert('[INFO] App resumed');
            setTimeout(() => {
            this.init();
          }, 0);
           
        });
        


      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
      //check for the session of the user
      this.init();
    });
  }

  init() {
    this._config.setDeviceId(Device.device.uuid);
    this._config.setDevice(Device.device.platform);
    this._config.setRegistrationId('');
    var authtoken = localStorage.getItem('AuthToken');
    if (authtoken == null || authtoken == '' || authtoken == 'null' || authtoken == undefined || authtoken == 'undefined')
      this.rootPage = LandingPage;
    else {
      localStorage.setItem("homeView", "teams");
      localStorage.setItem("TabIndex", "0");
      localStorage.setItem("addteams", "0");
      this.rootPage = MainTabs;
      this.currdate.getTempCurrDate()
        .subscribe(data => {
          this._config.setCurrDate(data.CurrDate);
          console.log(data.CurrDate);

        });

      //  this.rootPage = EditStatsPage;
    }

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
        localStorage.setItem("registrationId", data.registrationId);
        //   this._config.setRegistrationId(data.registrationId);
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




  }



}
ionicBootstrap(MyApp, [MyPlayerConfigService, LoginService, TempCurrDateService, SettingsService, TelCarriersListService]);