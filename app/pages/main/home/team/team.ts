import { Component, Injectable } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { LoginService } from '../../../../services/login';
import { UnFollowTeamService } from '../../../../services/unfollowteam';
import { MainTabs } from "../../../../pages/main/tabs/main-tabs";


@Component({
  templateUrl: 'build/pages/main/home/team/team.html',
  providers: [UnFollowTeamService]
})

export class TeamPage {

  private SelectedTeam;

  constructor(private navCtrl: NavController,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private loginService: LoginService,
    private unfollowTeamService: UnFollowTeamService) {

    this.SelectedTeam = this.navParams.get("SelectedTeam");
    console.log(this.SelectedTeam);
  }
  unFollow(id) {
    console.log(id);
    localStorage.setItem('homeView', 'teams');
    localStorage.setItem('TabIndex', '0');
    var team = { TeamId: id, UserId: this.loginService.getUserInfo().Context.User.UserId };
    console.log(team);

    this.unfollowTeamService.unfollowTeam(team)
      .subscribe(data => {

        console.log(data);
        this.loginService.setRegUserTournaments(data.RegUserTournaments);
        this.loginService.setRegUserPlayers(data.RegUserPlayers);
        this.loginService.setCustodianTeam(data.CustodianTeams);
        
        //  this.navCtrl.remove(this.viewCtrl.index);
        //  this.navCtrl.pop();
       /*  localStorage.setItem("TabIndex", '0');
         this.navCtrl.setRoot(MainTabs);*/
         this.viewCtrl.dismiss("1");
      })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
