import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams, PopoverController} from 'ionic-angular';
import {StandingsDivisionFilterPage} from './division-filter/division-filter'
import {GroupTeamsPipe} from '../../../../../pipes/groupteambypool';
import {LoginService} from '../../../../../services/login';

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
          this.getTeamStandings();
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
          for(var i=0;i<this.followedTeamsStandings.length;i++){
            if(this.followedTeamsStandings[i].DivisionName == divname)
              this.selectedTournStandings.push(this.followedTeamsStandings[i]);
          }
       }
       else
          this.selectedTournStandings = this.followedTeamsStandings;
       console.log(this.selectedTournStandings);
  }

  goToSelectDivisionPage(divisionEvent) {
     //   console.log("Divisions");
    //   this.navCtrl.pop();

        let divisionPopover = this.divisionPopoverCtrl.create(StandingsDivisionFilterPage,{
            SelectedTournStandings : this.selectedTournStandings,
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
    this.viewCtrl.dismiss();
  }
}
