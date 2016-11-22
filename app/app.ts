import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/auth/login/login'
import {LandingPage} from './pages/auth/landing/landing'
import {PurchaseEventPage} from './pages/main/events/purchase/event/purchase-event'
import {RootPage} from './pages/root-page/root-page'
import {RecordStatsPage} from './pages/record-stats/record-stats'
import {MainTabs} from './pages/main/tabs/main-tabs'
import {EventSchedulePage} from './pages/main/events/event/event-schedule/schedule'
// import {SelectedPlayerPage} from 'pages/main/my-players/selected-player/tabs'



@Component({
  templateUrl: 'build/pages/root-page/root-page.html'
})

export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    
    this.rootPage = LandingPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // StatusBar.overlaysWebView(true)
    });
  }
}

ionicBootstrap(MyApp);