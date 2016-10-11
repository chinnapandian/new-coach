import {Component} from '@angular/core';
import {NavController, ModalController, ActionSheetController} from 'ionic-angular';
import {SeasonsPage} from "./seasons/seasons";
import {PlayerPage} from "./player/player";
import {ChatPage} from "./chat/chat";

@Component({
  templateUrl: 'build/pages/teams/tabs/tabs.html'
})

export class TeamTabsPage {
  ScheduleTab: any;
  MessageTab: any;
  PlayerTab: any;

  constructor() {
    this.ScheduleTab = SeasonsPage;
    this.MessageTab = ChatPage;
    this.PlayerTab = PlayerPage;
  }
}

//dfsd