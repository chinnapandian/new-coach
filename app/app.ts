import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {TournamentPage} from './pages/tournament/tournament'
import {TeamsPage} from './pages/teams/teams'
import {LoginPage} from './pages/auth/login/login'
import {MessageBoardPage} from './pages/message-board/message-board'
import {SelectedTeamPage} from './pages/add-team/selected-team/selected-team'

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})

export class MyApp {

  // private rootPage: any;
  rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TeamsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
