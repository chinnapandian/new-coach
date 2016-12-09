import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams,Page} from 'ionic-angular';
import {EventBracketsPage} from "../../event-brackets/brackets";

@Page({
  templateUrl: 'build/pages/brackets/divisions/select-div.html'
})
export class BracketDivisionsPage {

  private uniqueDivisions = []; 
  private uniquePools = [];  
  private poolsOfDivisions = [];
  private selectedBracketGames = [];
  private brackets =[];
  private SelectedTournament;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private navParams : NavParams) {

         this.SelectedTournament = this.navParams.get("SelectedTournament");
         this.brackets = this.navParams.get("Brackets");

         for(var i=0;i<this.brackets.length;i++){
            if(this.brackets[i].TournamentId == this.SelectedTournament.TournamentId)
              this.selectedBracketGames.push(this.brackets[i]);
        }
        
         this.uniqueDivisions = this.removeDuplicates(this.selectedBracketGames, "DivisionId");
         this.getPoolCountOfDivisions();
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

  getPoolCountOfDivisions(){   
    for (var j = 0; j < this.uniqueDivisions.length; j++) {
          var count=0;var pools = [];
          for (var i = 0; i < this.selectedBracketGames.length; i++) {
            if(this.uniqueDivisions[j].DivisionId == this.selectedBracketGames[i].DivisionId)
                    pools.push({PoolId : this.selectedBracketGames[i].PoolId,
                                PoolName : this.selectedBracketGames[i].PoolName,
                                DivisionId : this.selectedBracketGames[i].DivisionId,
                                DivisionName : this.selectedBracketGames[i].DivisionName,
                                TeamId1 : this.selectedBracketGames[i].TeamId1,
                                TeamName1 : this.selectedBracketGames[i].Team1Name,
                                TeamId2 : this.selectedBracketGames[i].TeamId2,
                                TeamName2 : this.selectedBracketGames[i].Team2Name,
                                });
             }
          this.uniquePools = this.removeDuplicates(pools, "PoolId"); 
          this.poolsOfDivisions.push({DivisionId : this.uniqueDivisions[j].DivisionId,
                                      DivisionName : this.uniqueDivisions[j].DivisionName,
                                      Pools: this.uniquePools}) 
    }
  }

  goToPoolsPage(division){
        this.navCtrl.push(EventBracketsPage,
              {
                SelectedDivision : division,
                SelectedTournament : this.navParams.get("SelectedTournament")
              });
   }
   

}
