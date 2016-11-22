import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {EventsPage} from "../events/events";
import {SettingsListPage} from "../settings/settings-list";
import {MessageBoardPage} from "../message-board/message-board";
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'build/pages/main/tabs/main-tabs.html'
})

export class MainTabs {

  HomeTab: any;
  EventsTab: any;
  MessageBoardTab: any;
  SettingsTab: any;

  constructor() {
    this.HomeTab = HomePage;
    this.EventsTab = EventsPage;
    this.MessageBoardTab = MessageBoardPage;
    this.SettingsTab = SettingsListPage;
  }
}