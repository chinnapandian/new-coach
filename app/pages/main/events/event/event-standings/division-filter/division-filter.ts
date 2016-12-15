import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {EventStandingsPage} from '../standings';
import {LoginService} from '../../../../../../services/login';

@Component({
  templateUrl: 'build/pages/main/events/event/event-standings/division-filter/division-filter.html'
})
export class StandingsDivisionFilterPage {
  private selectedTournStandings = [];
  private divisionFilter;
  private divisionName;
  private selecteddivision;
  private divisions = [];
  
  private ev;
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private navParams : NavParams,
              private loginService : LoginService) {
        
        this.selectedTournStandings = this.navParams.get("SelectedTournStandings");
        this.divisions.push({DivisionId:-1,DivisionName:'All Divisions'});
        (this.removeDuplicates(this.selectedTournStandings,"DivisionId")).forEach(t => {
            this.divisions.push({DivisionId: t.DivisionId, DivisionName: t.DivisionName});
        });
        this.divisionFilter = this.navParams.get("SelectedDivision");
        console.log(this.divisionFilter);
  }

  removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject  = {};

      for(var i in originalArray) {
          lookupObject[originalArray[i][prop]] = originalArray[i];
      }

      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
        return newArray;
  }

 setSelectedDivision(division){
       this.selecteddivision = division;
       this.divisionFilter = division;
  }

  dismiss() {
    console.log(this.divisionFilter);
  this.viewCtrl.dismiss(this.divisionFilter);
  }

}
