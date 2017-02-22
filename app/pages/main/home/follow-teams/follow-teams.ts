import { Component, Injectable } from '@angular/core';
import { Page, Modal, NavController, ModalController, App, AlertController, LoadingController, ViewController, Alert, NavParams } from 'ionic-angular';
import { TeamsListService } from "../../../../services/getteamsofoperators";
import { MyPlayerConfigService } from '../../../../services/config';
import { LoginService } from '../../../../services/login';
import { FollowTeamsService } from '../../../../services/followteams';
import { GroupBoysTeamsByOrgPipe } from '../../../../pipes/groupboysteamsbyorgid';
import { GroupGirlsTeamsByOrgPipe } from '../../../../pipes/groupgirlsteamsbyorgid';
import { MainTabs } from '../../../../pages/main/tabs/main-tabs';
import { SearchTeamsPipe } from '../../../../pipes/searchteam';
import { SortPipe } from '../../../../pipes/sort';
import { PurchaseEventPage } from '../../../../pages/main/events/purchase/event/purchase-event';

@Injectable()
export class FollowTeam {
  FollowUpTeams = [];
}

@Page({
  templateUrl: 'build/pages/main/home/follow-teams/follow-teams.html',
  providers: [TeamsListService, FollowTeamsService],
  pipes: [GroupBoysTeamsByOrgPipe, GroupGirlsTeamsByOrgPipe, SearchTeamsPipe, SortPipe]
})

export class FollowTeamsPage {

  private teamGender: string = 'boys';
  private teams = [];
  private boysteams = [];
  private girlsteams = [];
  private selectedOperator;
  private boysteamsFollowed = [];
  private girlsteamsFollowed = [];
  private dataLoading = true;
  private SearchKeyword = '';
  private showHideBoysHeader = [];
  private showHideGirlsHeader = [];
  private maxTeamsToFollow = 10;
  private today;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private teamsList: TeamsListService,
    private config: MyPlayerConfigService,
    private loginService: LoginService,
    private alertCtrl: AlertController,
    private followTeamsService: FollowTeamsService,
    private appCtrl: App) {
    this.fillteams();
  }

  fillteams() {
    this.selectedOperator = this.navParams.get('SelectedOperator');
    var orgid = this.selectedOperator.OrgId;
    console.log(this.loginService.getUserInfo());
    this.today = this.config.getCurrDate();
    var userid = this.loginService.getUserInfo().Context.User.UserId;
    // var sports = this.loginService.getUserInfo().Context.User.Settings.SelectedSportsType;

    this.teamsList.getTeamsList(orgid, userid, 'basketball')
      .subscribe(data => {
         this.dataLoading = false;
        console.log(data);
        this.teams = data;
        for (var i = 0; i < this.teams.length; i++) {
          if (this.teams[i].Gender == 'M')
            this.boysteams.push(this.teams[i]);
          else
            this.girlsteams.push(this.teams[i]);
        }

        var bindex = 0;
        this.boysteams.forEach(team => {
          this.showHideBoysHeader[bindex] = false;
          bindex++;
        });
        var gindex = 0;
        this.girlsteams.forEach(team => {
          this.showHideGirlsHeader[gindex] = false;
          gindex++;
        });
       
      })

  }

  onInput(key) {
    console.log("input");
    this.SearchKeyword = key.target.value.toString().toLowerCase();
    if (this.SearchKeyword == '') {
      this.visibleBoysOrgInList(this.boysteams, false);
      this.visibleGirlsOrgInList(this.girlsteams, false);
    } else {
      this.visibleBoysOrgInList(this.boysteams, true);
      this.visibleGirlsOrgInList(this.girlsteams, true);
    }
  }
  visibleBoysOrgInList(team, value) {
    var index = 0;
    team.forEach(t => {
      this.showHideBoysHeader[index] = value;
      index++;
    });
  }

  visibleGirlsOrgInList(team, value) {
    var index = 0;
    team.forEach(t => {
      this.showHideGirlsHeader[index] = value;
      index++;
    });
  }

  showhideBoysteam(index) {
    if (this.showHideBoysHeader[index] == false)
      this.showHideBoysHeader[index] = true;
    else
      this.showHideBoysHeader[index] = false;
    return this.showHideBoysHeader[index];
  }

  showhideGirlsteam(index) {
    if (this.showHideGirlsHeader[index] == false)
      this.showHideGirlsHeader[index] = true;
    else
      this.showHideGirlsHeader[index] = false;
    return this.showHideGirlsHeader[index];
  }

  followBoysTeams(team) {
    var custodianTeamCount = this.removeDuplicates(this.loginService.getCustodianTeam(),"TeamId").length;
    console.log(custodianTeamCount);
    if ((((this.boysteamsFollowed.concat(this.girlsteamsFollowed)).length)+custodianTeamCount) < this.maxTeamsToFollow)
      this.boysteamsFollowed.push({ TeamId: team.TeamId, UserId: this.loginService.getUserInfo().Context.User.UserId });
    else {
      let alert = this.alertCtrl.create({
        title: 'Follow Teams',
        subTitle: 'You can only follow a maximum of '+ this.maxTeamsToFollow + ' Teams at a time',
        buttons: [{
          text: 'OK',
          handler: () => {
          }
        }],
      });
      alert.present();
    }
  }

  unfollowBoysTeams(team) {
    for (var i = this.boysteamsFollowed.length - 1; i >= 0; i--) {
      if (this.boysteamsFollowed[i].TeamId == team.TeamId) {
        this.boysteamsFollowed.splice(i, 1);
      }
    }
    this.updateBoysTeamsFollowedAfterDeletion();
  }

  followGirlsTeams(team) {
    var custodianTeamCount = this.removeDuplicates(this.loginService.getCustodianTeam(),"TeamId").length;
    console.log(custodianTeamCount);
    if ((((this.boysteamsFollowed.concat(this.girlsteamsFollowed)).length)+custodianTeamCount) < this.maxTeamsToFollow)
      this.girlsteamsFollowed.push({ TeamId: team.TeamId, UserId: this.loginService.getUserInfo().Context.User.UserId });
    else {
      let alert = this.alertCtrl.create({
        title: 'Follow Teams',
        subTitle: 'You can only follow a maximum of 3 Teams at a time',
        buttons: [{
          text: 'OK',
          handler: () => {
          }
        }],
      });
      alert.present();
    }
  }

  unfollowGirlsTeams(team) {
    for (var i = this.girlsteamsFollowed.length - 1; i >= 0; i--) {
      if (this.girlsteamsFollowed[i].TeamId == team.TeamId) {
        this.girlsteamsFollowed.splice(i, 1);
      }
    }
    this.updateGirlsTeamsFollowedAfterDeletion();
  }

  updateBoysTeamsFollowedAfterDeletion() {
    var copyFollowedTeams = [];
    for (var j = 0; j < this.boysteamsFollowed.length; j++) {
      copyFollowedTeams.push(this.boysteamsFollowed[j]);
    }
    this.boysteamsFollowed = [];
    for (var j = 0; j < copyFollowedTeams.length; j++) {
      this.boysteamsFollowed.push(copyFollowedTeams[j]);
    }
  }

  updateGirlsTeamsFollowedAfterDeletion() {
    var copyFollowedTeams = [];
    for (var j = 0; j < this.girlsteamsFollowed.length; j++) {
      copyFollowedTeams.push(this.girlsteamsFollowed[j]);
    }
    this.girlsteamsFollowed = [];
    for (var j = 0; j < copyFollowedTeams.length; j++) {
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

  saveFollowedTeams() {
    var ongoing_upcoming_tourns = [];
    localStorage.setItem('homeView', 'teams');
    localStorage.setItem("TabIndex", '0');
    var followTeamObj = new FollowTeam();
    followTeamObj.FollowUpTeams = this.boysteamsFollowed.concat(this.girlsteamsFollowed);
    console.log(followTeamObj);
    this.followTeamsService.followTeams(followTeamObj)
      .subscribe(data => {
        console.log(data);
        this.loginService.setRegUserTournaments(data.RegUserTournaments);
        this.loginService.setCustodianTeam(data.CustodianTeams);
        var RegUserTournaments = this.removeDuplicates(data.RegUserTournaments, "TournamentId");
        console.log(RegUserTournaments);
        console.log(this.today);
        for (var i = 0; i < RegUserTournaments.length; i++) {
          if (((RegUserTournaments[i].StartDate <= this.today) && (RegUserTournaments[i].EndDate >= this.today))||
              (RegUserTournaments[i].StartDate > this.today)) {
            //to get all games of current tournaments
            ongoing_upcoming_tourns.push(RegUserTournaments[i]);
          }
        }
        console.log(ongoing_upcoming_tourns);
        this.navCtrl.push(PurchaseEventPage, {
          Ongoing_Upcoming_Tourns: ongoing_upcoming_tourns,
        });
        /*   this.viewCtrl.dismiss();
           this.navCtrl.remove(this.viewCtrl.index);
           this.navCtrl.remove(this.viewCtrl.index-1);
           this.navCtrl.pop();*/
        // this.navCtrl.setRoot(MainTabs);
      })

  }
  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
  setGender(gender) {
    if (gender == 'M')
      return 'B';
    else
      return 'G';
  }
  clearsearch() {
    this.SearchKeyword = '';
    console.log(this.boysteamsFollowed.length);
    if (this.boysteamsFollowed.length == 0)
      this.visibleBoysOrgInList(this.boysteams, false);
    if (this.girlsteamsFollowed.length == 0)
      this.visibleGirlsOrgInList(this.girlsteams, false);
  }
  onCancel(ev) {
    console.log("event");
    console.log(ev.target.value);
  }
  change() {
    this.SearchKeyword = '';
    this.visibleBoysOrgInList(this.boysteams, false);
    this.visibleGirlsOrgInList(this.girlsteams, false);
  }
  dismiss() {
    localStorage.setItem('homeView', 'teams');
    localStorage.setItem('TabIndex', '0');
    this.viewCtrl.dismiss();
  }
}
