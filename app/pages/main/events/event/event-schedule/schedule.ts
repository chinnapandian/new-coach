import {Component} from '@angular/core';
import {TeamFilterPage} from './popovers/team/team';
import {GameDetailsPage} from '../game-details/game-details';
import {Page, Modal, NavController, ViewController, ModalController,PopoverController, ActionSheetController, ActionSheet, NavParams, Alert} from 'ionic-angular';
import {TournamentDataService} from '../../../../../services/tournament';
import {LoginService} from '../../../../../services/login';
import {SortPipe} from '../../../../../pipes/sort';
// import {scorekeeperPage} from '../scorekeeper/scorekeeper';
import {TempCurrDateService} from  '../../../../../services/tempcurrdate';
import {MyPlayerConfigService} from  '../../../../../services/config';


@Component({
    templateUrl: 'build/pages/main/events/event/event-schedule/schedule.html',
    providers : [TournamentDataService,TempCurrDateService],
    pipes :[SortPipe]
})

export class EventSchedulePage {

    private tournamentView:string = 'schedule';
    private completedPoolGames:any = [];   
    private ongoingPoolGames:any = [];
    private upcomingPoolGames:any = [];
    private filteredCompletedPoolGames:any = [];   
    private filteredOngoingPoolGames:any = [];
    private filteredUpcomingPoolGames:any = [];
    private tournament;
    private games;
    private division: string;
    private pool: string;
    private dataLoading = true;
    private today;
    private schedules = [];
    private brackets = [];
    private standings = [];
    private followedTeams = [];
    private tournamentId;
    private tournamentName;
    private teamFilter;
    private CurrTime;

    constructor(private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private navCtrl: NavController,
                private actionCtrl: ActionSheetController,
                private _tournamentData: TournamentDataService,
                private _loginService: LoginService,
                private _navParams : NavParams,
                private _tempCurrDate : TempCurrDateService,
                private teamPopoverCtrl: PopoverController,
                private navParams: NavParams,
                private config:MyPlayerConfigService){
          // Get tournament data
           this._tempCurrDate.getTempCurrDate()
                            .subscribe(data => {
                                this.CurrTime = data.CurrTime;  
                            });

          
          this.today = this.config.getCurrDate();
          this.tournamentId = localStorage.getItem('SelectedTournamentId');
          this.tournamentName = localStorage.getItem("SelectedTournamentName");
          this.followedTeams = this._loginService.getFollowedTeams();
          console.log(this.followedTeams);
          this.teamFilter=(this.navParams.get('teamFilter')==null?'All Teams':this.navParams.get('teamFilter'));
 
          this.getSelectedTournament();       
    }

    addDays(theDate, days) {
            return new Date(theDate.getTime() + days*24*60*60*1000);
    }
    presentTeamPopover(teamEvent) {
       
        let teamPopover = this.teamPopoverCtrl.create(TeamFilterPage,{
        TeamFilter : this.teamFilter
        });
        teamPopover.onDidDismiss(data => {
            console.log(data);
            this.teamFilter=data;
            this.filteredCompletedPoolGames = this.filterTeam(this.completedPoolGames);
            this.filteredOngoingPoolGames = this.filterTeam(this.ongoingPoolGames);
            this.filteredUpcomingPoolGames = this.filterTeam(this.upcomingPoolGames);          
        });
        teamPopover.present({
        ev: teamEvent
        });
   }

   filterTeam(games){
     if(this.teamFilter!='All Teams'){
        return games.filter(item => 
                      (item.Team1Name.toLowerCase().indexOf(this.teamFilter.toString().toLowerCase()) > -1)||
                      (item.Team2Name.toLowerCase().indexOf(this.teamFilter.toString().toLowerCase()) > -1));
     }
     else
        return games;
        
   }

    goToGameDetailsPage() {
        let detailsModal = this.modalCtrl.create(GameDetailsPage);
        detailsModal.present();
    };

    dismiss() {
        this.viewCtrl.dismiss();
    }
 
    getSelectedTournament() {
      
            var orgid = this._loginService.getUserInfo().Context.User.OrgId;
            var userid =  this._loginService.getUserInfo().Context.User.UserId;
            var tournamentid = this.tournamentId;
            var sports = "basketball";
            console.log(tournamentid,userid);
            this._tournamentData.getTournamentScheduleStandings(orgid,userid,tournamentid,sports)
            .subscribe(data => {
                  console.log(data);
                  this._loginService.setTournamentScheduleStandings(data.GameResults,data.Brackets, data.Standings);
                  this.schedules = data.GameResults;

                  /*  var eventStartTime = new Date(game.StartDateTime);
            var eventEndTime = new Date(data.CurrTime);
            var duration = eventStartTime.getTime() - eventEndTime.getTime();
            var durationInMinutes =  Math.round(duration / 60000);*/
                  ///////  getTeamSchedules();  //////
                  this.followedTeams.forEach(team => {
                        this.schedules.forEach(schedule => {
                          if((schedule.TeamId1==team.TeamId)||(schedule.TeamId2==team.TeamId)){
                               if ((schedule.GameDate < this.today)||
                                    (((schedule.GameDate == this.today))&&
                                    ((new Date(schedule.EndDateTime).getTime())<(new Date(this.CurrTime).getTime())))) {
                                    //to get all games of current tournaments
                                        this.completedPoolGames.push(schedule);                        
                                    }
                                    else if ((schedule.GameDate == this.today)&&
                                    ((new Date(schedule.StartDateTime).getTime())<(new Date(this.CurrTime).getTime()))&&
                                    ((new Date(schedule.EndDateTime).getTime())>(new Date(this.CurrTime).getTime()))){
                                        //to get all games of past tournaments
                                        this.ongoingPoolGames.push(schedule);
                                    }
                                    else  if ((schedule.GameDate > this.today)||
                                    (((schedule.GameDate == this.today))&&
                                    ((new Date(schedule.StartDateTime).getTime())>(new Date(this.CurrTime).getTime())))){
                                        //to get all games of future tournaments
                                        this.upcomingPoolGames.push(schedule);
                                    }
                            /*   if ((schedule.GameDate < this.today)||
                                    (((schedule.GameDate == this.today))&&
                                    (schedule.EndDateTime.toString().substring(11,13)<new Date().toString().substring(16,18)))) {
                                    //to get all games of current tournaments
                                        this.completedPoolGames.push(schedule);                        
                                    }
                                    else if ((schedule.GameDate == this.today)&&
                                    (schedule.StartDateTime.toString().substring(11,13)<new Date().toString().substring(16,18))&&
                                    (schedule.EndDateTime.toString().substring(11,13)>new Date().toString().substring(16,18))){
                                        //to get all games of past tournaments
                                        this.ongoingPoolGames.push(schedule);
                                    }
                                    else  if ((schedule.GameDate > this.today)||
                                    (((schedule.GameDate == this.today))&&
                                    (schedule.StartDateTime.toString().substring(11,13)>new Date().toString().substring(16,18)))){
                                        //to get all games of future tournaments
                                        this.upcomingPoolGames.push(schedule);
                                    }*/
                          }
                        });
                    });
                    this.filteredCompletedPoolGames = this.completedPoolGames;
                    this.filteredOngoingPoolGames = this.ongoingPoolGames;
                    this.filteredUpcomingPoolGames = this.upcomingPoolGames;
                    console.log("done");
                    this.dataLoading=false;
                    
           });
           
   
  }

  getDate(dt: string) {
    return this.getFormattedDate(new Date(dt.substr(0, 19)));
  }

  getTime(dt: string) {
    return new Date(dt.substr(0, 19));
  }

 getFormattedDate(date) {
       var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
       var months =['January','February','March','April','May','June','July','August','September','October','November','December'];
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return (weekdays[date.getDay()]+ ", " + months[date.getMonth()] + ' ' + day);
  }

  convertToAmPm(dt){
          var ampm = (parseInt(dt.substr(0,2)) >= 12) ? "PM" : "AM";
          var hours;
          if (parseInt(dt.substr(0,2)) == 12)
            hours = 12;
          else if (parseInt(dt.substr(0,2)) > 12)
            hours =  parseInt(dt.substr(0,2))-12;
          else
            hours = parseInt(dt.substr(0,2));
          var min = dt.substr(2,3);
          return(hours + "" + min + " " + ampm);
   }

  getWin(record: string) {
    return record.split('-')[0];
  }

  getLoss(record: string) {
    return record.split('-')[1];
  }

  goToGameDetails(gameId) {
   /* console.log(gameId);
    this.gameDetails = this.schedules.filter((v) => {

      if (v.GameId === gameId) {
        return true;
      }
      return false;
    })

    this._navController.push(GameDetailsPage,
      { gameDetails: this.gameDetails });*/
  }

  chooseFilter(filter) {
  /*  let self = this;
    let alert = Alert.create();
    alert.setTitle(filter[0].toUpperCase() + filter.slice(1));

    if (filter == 'division') {
      this.tournament.Divisions.forEach(function (div) {
        let input = {
          type: 'radio',
          label: div.DivisionName,
          value: div.DivisionName,
          checked: false
        };
        if (div.DivisionName == self.division) {
          input.checked = true;
        }
        alert.addInput(input);
      });
    }
    else if (filter == 'pool') {
      this.tournament.Pools.forEach(function (pool) {
        let input = {
          type: 'radio',
          label: pool.PoolName,
          value: pool.PoolName,
          checked: false
        };
        if (pool.PoolName == self.pool) {
          input.checked = true;
        }
        alert.addInput(input);
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        if (filter == 'division') {
          this.division = data;
        }
        else if (filter == 'pool') {
          this.pool = data;
        }
      }
    });

    this._navController.present(alert);*/
  }

  showTeamDetails() {
    // TODO
  }

  goToTournamentDetails(){
  /*  this._navController.push(TournamentDetailsPage,{
      tournamentId :this.tournamentId
     });*/
  }

  close() {
     localStorage.setItem("TabIndex",'1');
    this.viewCtrl.dismiss();
  }
}
