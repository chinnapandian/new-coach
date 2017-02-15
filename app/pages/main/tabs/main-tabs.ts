import {Component,ViewChild} from '@angular/core';
import {NavController, ViewController, ModalController, Tabs, Nav} from 'ionic-angular';
import {EventsPage} from "../events/events";
import {SettingsListPage} from "../settings/settings-list";
import {MessageBoardPage} from "../message-board/message-board";
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'build/pages/main/tabs/main-tabs.html'
})

export class MainTabs {
@ViewChild('myTabs') tabRef: Tabs;

  HomeTab: any;
  EventsTab: any;
  MessageBoardTab: any;
  SettingsTab: any;
  private tabIndex;
  private tabBarElement;
  constructor(private nav:NavController) {
    this.HomeTab = HomePage;
    this.EventsTab = EventsPage;
    this.MessageBoardTab = MessageBoardPage;
    this.SettingsTab = SettingsListPage;

  }

  ionViewDidEnter() {   
    console.log("ls"+parseInt(localStorage.getItem("TabIndex")));
      this.tabIndex = (localStorage.getItem("TabIndex")==null)?0:parseInt(localStorage.getItem("TabIndex"));
      console.log(this.tabIndex);
      this.tabRef.select(this.tabIndex);
 }
}