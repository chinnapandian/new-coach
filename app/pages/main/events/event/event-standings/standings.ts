import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams, PopoverController} from 'ionic-angular';
import {StandingsDivisionFilterPage} from './division-filter/division-filter'
import {GroupTeamsPipe} from '../../../../../pipes/groupteambypool';
import {LoginService} from '../../../../../services/login';
import {MainTabs} from '../../../../main/tabs/main-tabs';

@Component({
  templateUrl: 'build/pages/main/events/event/event-standings/standings.html',
  pipes :[GroupTeamsPipe]
})

export class EventStandingsPage {

  private tournstandings = [];
  private selectedTournStandings =[];
  private SelectedDivision;
  private SelectedDivisionId;
  private SelectedTournamentName;
  private SelectedTournamentId;
  private PoolsOfSelectedDivision = [];
  private uniquePools=[];
  private uniqueDivisions =[];
  private poolsOfDivisions = [];
  private divisionFilter;
  private followedTeams = [];
  private followedTeamsStandings = [];
  private dataLoading = true;
  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private popoverCtrl: PopoverController,
      private modalCtrl: ModalController,
      private divisionPopoverCtrl: PopoverController,
      private loginService : LoginService,
      private navParams: NavParams) {
          this.SelectedTournamentName = localStorage.getItem("SelectedTournamentName");
          this.SelectedTournamentId = localStorage.getItem("SelectedTournamentId");
          this.followedTeams = this.loginService.getFollowedTeams();
          this.tournstandings = this.loginService.getTournamentStandings();

          console.log(this.tournstandings);
          this.divisionFilter=(this.navParams.get('divisionFilter')==null?'All Divisions':this.navParams.get('divisionFilter'));
        //  this.getTeamStandings();
          this.getStandingsOfDivision(this.divisionFilter);
  }

   getTeamStandings(){
     this.followedTeams.forEach(team => {
        this.tournstandings.forEach(standing => {
          if(standing.TeamId==team.TeamId){
              this.followedTeamsStandings.push(standing);
          }
        });
     });
     console.log(this.followedTeamsStandings);
  }

  getStandingsOfDivision(divname){
       this.selectedTournStandings = [];
       if(this.divisionFilter != 'All Divisions'){
          for(var i=0;i<this.tournstandings.length;i++){
            if(this.tournstandings[i].DivisionName == divname)
              this.selectedTournStandings.push(this.tournstandings[i]);
          }
       }
       else
          this.selectedTournStandings = this.tournstandings;
       console.log(this.selectedTournStandings);
       this.dataLoading=false;
  }

  goToSelectDivisionPage(divisionEvent) {
     //   console.log("Divisions");
    //   this.navCtrl.pop();

        let divisionPopover = this.divisionPopoverCtrl.create(StandingsDivisionFilterPage,{
            SelectedTournStandings : this.tournstandings,
            SelectedDivision : this.divisionFilter
        });
        divisionPopover.onDidDismiss(data => {
                console.log(data);
                this.divisionFilter=data;
                this.getStandingsOfDivision(data);          
         });
        divisionPopover.present({
            ev: divisionEvent
         });
     }


  dismiss() {
       localStorage.setItem("TabIndex","1");
         if(localStorage.getItem("FromEventsTab")=="true"){
              this.viewCtrl.dismiss();
         }else{        
               this.viewCtrl.dismiss();
                this.navCtrl.push(MainTabs);
         }
         localStorage.setItem("FromEventsTab","false");  
  }
}
