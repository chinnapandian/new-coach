import {Component,Injectable} from '@angular/core';
import {Page, Modal, NavController, ModalController,AlertController,LoadingController, ViewController, Alert, NavParams} from 'ionic-angular';
import {TeamsListService} from "../../../../services/getteamsofstate";
import {MyPlayerConfigService} from '../../../../services/config';
import {LoginService} from '../../../../services/login';
import {FollowTeamsService} from '../../../../services/followteams';
import {GroupBoysTeamsByOrgPipe} from '../../../../pipes/groupboysteamsbyorgid';
import {GroupGirlsTeamsByOrgPipe} from '../../../../pipes/groupgirlsteamsbyorgid';
import {HomePage} from '../../../../pages/main/home/home';

@Injectable()
export class FollowTeam {  
  FollowUpTeams=[];
}

@Page({
  templateUrl: 'build/pages/main/home/follow-teams/follow-teams.html',
  providers : [TeamsListService,FollowTeamsService],
  pipes : [GroupBoysTeamsByOrgPipe, GroupGirlsTeamsByOrgPipe]
})

export class FollowTeamsPage {

  private teamGender: string = 'boys';
  private teams =[] ;
  private boysteams  = [];
  private girlsteams  = [];
  private selectedState;
  private boysteamsFollowed = [];
  private girlsteamsFollowed = [];
  private dataLoading = true;


  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private navParams : NavParams,
      private teamsList : TeamsListService,
      private config : MyPlayerConfigService,
      private loginService : LoginService,
      private followTeamsService : FollowTeamsService) {
                this.fillteams();
      }

    fillteams(){
        this.selectedState = this.navParams.get('SelectedState');
        var statecode = this.selectedState.StateCode;
        console.log(this.loginService.getUserInfo());
        var userid = this.loginService.getUserInfo().Context.User.UserId;
       // var sports = this.loginService.getUserInfo().Context.User.Settings.SelectedSportsType;
        
         this.teamsList.getTeamsList(statecode, userid, 'basketball')
        .subscribe(data => {
            this.teams = data;
            for(var i=0;i<this.teams.length;i++) {
                if(this.teams[i].State == statecode) {
                    if(this.teams[i].Gender == 'M')
                      this.boysteams.push(this.teams[i]);
                    else
                      this.girlsteams.push(this.teams[i]);
                }
            }
           console.log(this.boysteams);
           console.log(this.girlsteams);
           this.dataLoading = false;
        })
        
  }


  followBoysTeams(team){
       this.boysteamsFollowed.push({TeamId: team.TeamId, UserId: this.loginService.getUserInfo().Context.User.UserId});
  }

  unfollowBoysTeams(team){
       for(var i = this.boysteamsFollowed.length - 1; i >= 0; i--){
      if(this.boysteamsFollowed[i].TeamId == team.TeamId){
            this.boysteamsFollowed.splice(i,1);
      }
    }
    this.updateBoysTeamsFollowedAfterDeletion();
  }
  
  followGirlsTeams(team){
       this.girlsteamsFollowed.push({TeamId: team.TeamId, UserId: this.loginService.getUserInfo().Context.User.UserId});
  }

  unfollowGirlsTeams(team){
       for(var i = this.girlsteamsFollowed.length - 1; i >= 0; i--){
      if(this.girlsteamsFollowed[i].TeamId == team.TeamId){
            this.girlsteamsFollowed.splice(i,1);
      }
    }
    this.updateGirlsTeamsFollowedAfterDeletion();
  }

  updateBoysTeamsFollowedAfterDeletion()
  {
       var copyFollowedTeams=[];
       for(var j=0;j<this.boysteamsFollowed.length;j++)
       {
         copyFollowedTeams.push(this.boysteamsFollowed[j]);
       }
       this.boysteamsFollowed=[];
       for(var j=0;j<copyFollowedTeams.length;j++)
       {
         this.boysteamsFollowed.push(copyFollowedTeams[j]);
       }
  }

  updateGirlsTeamsFollowedAfterDeletion()
  {
       var copyFollowedTeams=[];
       for(var j=0;j<this.girlsteamsFollowed.length;j++)
       {
         copyFollowedTeams.push(this.girlsteamsFollowed[j]);
       }
       this.boysteamsFollowed=[];
       for(var j=0;j<copyFollowedTeams.length;j++)
       {
         this.girlsteamsFollowed.push(copyFollowedTeams[j]);
       }
  }

  checkBoysFollowedTeams(id) {

    let flag = false;
    if (this.boysteamsFollowed != null) {
      for (let i = 0; i < this.boysteamsFollowed.length; i++) {
        if (this.boysteamsFollowed[i].TeamId === id) {
          flag = true;
          break;
        }
      }
    }
    return flag;
  }

  checkGirlsFollowedTeams(id) {

    let flag = false;
    if (this.girlsteamsFollowed != null) {
      for (let i = 0; i < this.girlsteamsFollowed.length; i++) {
        if (this.girlsteamsFollowed[i].TeamId === id) {
          flag = true;
          break;
        }
      }
    }
    return flag;
  }
  
  saveFollowedTeams(){
    var followTeamObj = new FollowTeam();
    followTeamObj.FollowUpTeams = this.boysteamsFollowed.concat(this.girlsteamsFollowed);
    console.log(followTeamObj);
    this.followTeamsService.followTeams(followTeamObj)
    .subscribe(data =>
    {
      console.log(data);
      this.loginService.setRegUserTournaments(data.RegUserTournaments);
      this.loginService.setRegUserPlayers(data.RegUserPlayers);
      this.navCtrl.push(HomePage);
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
