import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams,Page} from 'ionic-angular';
import {EventBracketsPage} from "../../event-brackets/brackets";

@Component({
  templateUrl: 'build/pages/main/events/event/event-brackets/divisions/select-div.html'
})
export class BracketDivisionsPage {

  private uniqueDivisions = []; 
  private divisions = [];
  private selectedBracketGames = [];
  private SelectedTournament;
  private selecteddivision;
  private divisionFilter;
  private divisionId;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private navParams : NavParams) {

         this.selectedBracketGames = this.navParams.get("BracketGames");
         console.log(this.selectedBracketGames);
         this.divisions.push({DivisionId:-1,DivisionName:'All Divisions'});
         this.uniqueDivisions = this.removeDuplicates(this.selectedBracketGames, "DivisionId");
         this.uniqueDivisions.forEach(t => {
            this.divisions.push({DivisionId: t.DivisionId, DivisionName: t.DivisionName});
        });
        this.divisionFilter = this.navParams.get("SelectedDivision");
        console.log(this.divisionFilter);
        console.log(this.divisions);
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
       this.selecteddivision=division;
       this.divisionFilter = division;
       if(division == "All Divisions")
          this.divisionId = 0;
       else {
          this.divisions.forEach(d => {
            if(d.DivisionName==division)
              this.divisionId = d.DivisionId;
          });
       }

  }

  dismiss() {
    console.log(this.divisionFilter);
    this.viewCtrl.dismiss({
      DivisionName:this.divisionFilter,
    DivisionId:this.divisionId});
  }

}
