import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {TournamentPage} from "../../tournament/tournament";
import {TournamentDetailsPage} from "../../tournament/details/details";
import {HomePage} from "../../home/home";
import {PracticeSchedulePage} from "../../practice-schedule/practice-schedule";
import {MessageBoardPage} from "../../message-board/message-board";

@Component({
  templateUrl: 'build/pages/teams/tabs/tabs.html'
})

export class TeamTabsPage {
  tab1: any;
  tab2: any;
  tab3: any;

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController) {
    this.tab1 = HomePage;
    this.tab2 = PracticeSchedulePage;
    this.tab3 = MessageBoardPage;
  }
}
