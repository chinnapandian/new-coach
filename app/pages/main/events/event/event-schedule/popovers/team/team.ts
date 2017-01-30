import {Component} from '@angular/core';
import {ViewController, PopoverController, NavParams, NavController} from 'ionic-angular';
import {LoginService} from '../../../../../../../services/login';

@Component({
  templateUrl: 'build/pages/main/events/event/event-schedule/popovers/team/team.html'
})

export class TeamFilterPage {

  private teams = [];
  private followedTeams = [];
  private teamFilter;
  private selectedteam;
  private ev;

  constructor(public viewCtrl: ViewController,
              private popoverCtrl: PopoverController,
              private navCtrl : NavController,
              private navParams : NavParams,
              private loginService : LoginService) {

        this.followedTeams = this.loginService.getFollowedTeams();
        this.teams.push({TeamId:-1, TeamName:'All Teams'});
        this.followedTeams.forEach(t => {
          var gender = (t.Gender =='M' ? 'B' :'G');
          this.teams.push({TeamId: t.TeamId, TeamName: (t.TeamName + "(" + t.Grade + "/" + gender + ")")});
        });
        this.setDefaultFilterData();
      }

   setDefaultFilterData() {
     this.teamFilter = this.navParams.get("TeamFilter");
     console.log(this.teamFilter);
  }
   setSelectedTeam(team, teamname){
     console.log(teamname);
       this.selectedteam = teamname;
       this.teamFilter = team;
  }

  dismiss() {
     this.viewCtrl.dismiss({TeamId: this.teamFilter, TeamName:this.selectedteam});
  }


}

