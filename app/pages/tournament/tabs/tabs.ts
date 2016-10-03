import {Component} from '@angular/core';
import {NavController, ModalController, ActionSheetController} from 'ionic-angular';
import {TournamentPage} from "../tournament";
import {TournamentDetailsPage} from "../details/details";
import {GamePage} from "../game/game";
import {TournamentStandingsPage} from "../standings/standings";

@Component({
  templateUrl: 'build/pages/tournament/tabs/tabs.html'
})

export class TournamentTabsPage {
  tournamentTab1: any;
  // tournamentTab2: any;
  tournamentTab3: any;

  constructor() {
    this.tournamentTab1 = TournamentPage;
    // this.tournamentTab2 = TournamentDetailsPage;
    this.tournamentTab3 = TournamentStandingsPage;
  }
}
