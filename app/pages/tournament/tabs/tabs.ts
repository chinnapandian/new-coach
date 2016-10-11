import {Component} from '@angular/core';
import {NavController, ModalController, ActionSheetController} from 'ionic-angular';
import {StandingsPage} from "../standings/standings";
import {TournamentPage} from "../tournament";
import {BracketsPage} from "../brackets/brackets";

@Component({
  templateUrl: 'build/pages/tournament/tabs/tabs.html'
})

export class TournamentTabsPage {
  scheduleTab: any;
  bracketTab: any;
  standingsTab: any;

  constructor() {
    this.scheduleTab = TournamentPage;
    this.bracketTab = BracketsPage;
    this.standingsTab = StandingsPage;
  }
}
