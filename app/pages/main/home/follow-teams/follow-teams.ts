import {Component,Injectable} from '@angular/core';
import {Page, Modal, NavController, ModalController,AlertController,LoadingController, ViewController, Alert, NavParams} from 'ionic-angular';
import {TeamsListService} from "../../../../services/getteamsofstate";
import {MyPlayerConfigService} from '../../../../services/config';
import {LoginService} from '../../../../services/login';
import {FollowTeamsService} from '../../../../services/followteams';
import {GroupBoysTeamsByOrgPipe} from '../../../../pipes/groupboysteamsbyorgid';
import {GroupGirlsTeamsByOrgPipe} from '../../../../pipes/groupgirlsteamsbyorgid';
import {MainTabs} from '../../../../pages/main/tabs/main-tabs';
import {SearchTeamsPipe} from '../../../../pipes/searchteam';
import {SortPipe} from '../../../../pipes/sort';

@Injectable()
export class FollowTeam {  
  FollowUpTeams=[];
}

@Page({
  templateUrl: 'build/pages/main/home/follow-teams/follow-teams.html',
  providers : [TeamsListService,FollowTeamsService],
  pipes : [GroupBoysTeamsByOrgPipe, GroupGirlsTeamsByOrgPipe,SearchTeamsPipe,SortPipe]
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
  private SearchKeyword='';
  private showHideBoysHeader=[];
  private showHideGirlsHeader = [];

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
            console.log(data);
            this.teams = data;
            for(var i=0;i<this.teams.length;i++) {
                if(this.teams[i].State == statecode) {
                    if(this.teams[i].Gender == 'M')
                      this.boysteams.push(this.teams[i]);
                    else
                      this.girlsteams.push(this.teams[i]);
                }
            }

           var bindex=0;
           this.boysteams.forEach(team => {
             this.showHideBoysHeader[bindex]=false;
             bindex++;
           });
            var gindex=0;
           this.girlsteams.forEach(team => {
             this.showHideGirlsHeader[gindex]=false;
             gindex++;
           });
           this.dataLoading = false;
        })
        
  }

  onInput(key)
    {
      console.log("input");
        this.SearchKeyword = key.target.value.toString().toLowerCase();
        if(this.SearchKeyword == ''){
           this.visibleBoysOrgInList(this.boysteams,false);
           this.visibleGirlsOrgInList(this.girlsteams, false);
        }else{
            this.visibleBoysOrgInList(this.boysteams,true);
           this.visibleGirlsOrgInList(this.girlsteams, true);         
        }
    }
 visibleBoysOrgInList(team, value){
         var index=0;
           team.forEach(t => {
             this.showHideBoysHeader[index]=value;
             index++;
           });
    }

 visibleGirlsOrgInList(team, value){
         var index=0;
           team.forEach(t => {
             this.showHideGirlsHeader[index]=value;
             index++;
           });
    }

showhideBoysteam(index){
  if(this.showHideBoysHeader[index]==false)
     this.showHideBoysHeader[index]=true;
  else
     this.showHideBoysHeader[index]=false;
  return this.showHideBoysHeader[index];
}

showhideGirlsteam(index){
  if(this.showHideGirlsHeader[index]==false)
     this.showHideGirlsHeader[index]=true;
  else
     this.showHideGirlsHeader[index]=false;
  return this.showHideGirlsHeader[index];
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
    localStorage.setItem('homeView','teams');
    var followTeamObj = new FollowTeam();
    followTeamObj.FollowUpTeams = this.boysteamsFollowed.concat(this.girlsteamsFollowed);
    console.log(followTeamObj);
    this.followTeamsService.followTeams(followTeamObj)
    .subscribe(data =>
    {
      console.log(data);
    //  this.loginService.setRegUserTournaments(data.RegUserTournaments);
      this.loginService.setRegUserPlayers(data.RegUserPlayers);
      this.navCtrl.push(MainTabs);
    })
  }

   setGender(gender){
                if(gender == 'M')
                  return 'B';
                else
                  return 'G';  
  }
  clearsearch(){
    this.SearchKeyword = '';
    this.visibleBoysOrgInList(this.boysteams,false);
    this.visibleGirlsOrgInList(this.girlsteams, false);
  }
  onCancel(ev){
    console.log("event");
    console.log(ev.target.value);
  }
  change(){
        this.SearchKeyword = '';
      this.visibleBoysOrgInList(this.boysteams,false);
      this.visibleGirlsOrgInList(this.girlsteams, false);
  }
  dismiss() {
    localStorage.setItem('homeView','teams');
    this.viewCtrl.dismiss();
  }
}
