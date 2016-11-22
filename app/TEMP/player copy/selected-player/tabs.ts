import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {PlayerProfilePage} from "./player-profile/player-profile";
import {StatEventsPage} from "./stat-events/stat-events";

@Component({
  templateUrl: 'build/pages/selected-team/my-players/selected-player/tabs.html'
})

export class SelectedPlayerPage {

  PlayerProfileTab: any;
  StatEventsTab: any;

  constructor() {
    this.PlayerProfileTab = PlayerProfilePage;
    this.StatEventsTab = StatEventsPage;
  }
}

//dfsd