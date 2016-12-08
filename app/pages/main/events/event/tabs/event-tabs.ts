import {Component} from '@angular/core';
import {NavController, ModalController, ViewController, NavParams} from 'ionic-angular';
import {EventSchedulePage} from "../event-schedule/schedule";
import {EventBracketsPage} from "../event-brackets/brackets";
import {EventStandingsPage} from "../event-standings/standings";
import {EventInfoPage} from "../event-info/event-info";

@Component({
  templateUrl: 'build/pages/main/events/event/tabs/event-tabs.html'
})

export class SelectedEventTabs {
  
  // mainTab: any;
  eventScheduleTab: any;
  eventBracketTab: any;
  eventStandingsTab: any;
  eventInfoTab: any;

  constructor(private navParams: NavParams) {
    // this.mainTab = TournamentMainPage;
    this.eventScheduleTab = EventSchedulePage;
    this.eventBracketTab = EventBracketsPage;
    this.eventStandingsTab = EventStandingsPage;
    this.eventInfoTab = EventInfoPage;
  }
}
