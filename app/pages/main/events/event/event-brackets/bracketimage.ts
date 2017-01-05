import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams,Page} from 'ionic-angular';
import {BracketService} from '../../../../../services/bracket';
import {MyPlayerConfigService} from '../../../../../services/config';
import {DomSanitizationService} from '@angular/platform-browser';
import * as moment from 'moment';

declare var brackets: any;

@Component({
  templateUrl: 'build/pages/main/events/event/event-brackets/bracketimage.html',
  providers: [BracketService]
})

export class BracketImagePage {
  public bracket: any;
  private DivisionName;
  private DivisionId;
  private SelectedTournamentName;
  private SelectedTournamentId;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private _bracketService : BracketService,
      private navParams : NavParams,
      private _sanitizer: DomSanitizationService) {
     
      this.DivisionId = this.navParams.get("SelectedDivisionId");
      this.DivisionName =  this.navParams.get("SelectedDivisionName");
      this.SelectedTournamentName = localStorage.getItem("SelectedTournamentName");
      this.SelectedTournamentId = localStorage.getItem("SelectedTournamentId");
      
       console.log(this.SelectedTournamentId);
      console.log(this.DivisionId);
      this._bracketService.getBracketsDetails(this.SelectedTournamentId, this.DivisionId ,"BasketBall")
        .subscribe(data => {
           localStorage.setItem('bracketsdetails', data);
            console.log(data);
            // Segregate game details by bracketsId(caed-box) 
            var bracketById = {},
            row = [],
            teamSize = {},
            tournMaxGameId = 0,
            noOfTeams = 0,
            cardBoxId = '',
            gameIds = {}
            ;

        data.forEach(function (obj) {
            if (obj.BracketsId) {
                if (!bracketById[obj.BracketsId]) {
                    bracketById[obj.BracketsId] = {};
                    row = [];
                }

                if (!teamSize[obj.BracketsId]) {
                    teamSize[obj.BracketsId] = {};
                    noOfTeams = 0;
                }

                if (obj.TournTeamId1 !== 'winner') {
                    noOfTeams++;
                }
                if (obj.TournTeamId2 !== 'winner') {
                    noOfTeams++;
                }
                row.push(obj);

                if (!gameIds[obj.BracketsId]) {
                    gameIds[obj.BracketsId] = {};
                    gameIds[obj.BracketsId] = obj.GameId;
                }
                
                tournMaxGameId = obj.maxGameId;

                teamSize[obj.BracketsId] = noOfTeams;
                bracketById[obj.BracketsId] = row;
            } else {
                tournMaxGameId = obj.maxGameId;
            }
        });

      this.bracket = brackets.API;
      console.log(this.bracket);
      var bracketTemp = '';
      
     Object.keys(teamSize).forEach(function(key) {
       var value = teamSize[key];
            cardBoxId = '';

            // Populate team information
      var dataObj =  bracketById[key];
      var games  =  brackets.API.generateChampionshipBracket(value, [], []);
     
      for (let j = 0; j < games.length; j++)
      {
        var k = 0;
        for (let i = 0; i < dataObj.length; i++)
        {
           if (games[j].level == dataObj[i].BracketLevel) 
           {
              games[j].matchup[k].gameId = dataObj[i].GameId;
              games[j].matchup[k].team1Name = dataObj[i].Team1Name;
              games[j].matchup[k].team2Name = dataObj[i].Team2Name;
              games[j].matchup[k].team1PoolId = dataObj[i].Pool1Id;
              games[j].matchup[k].team2PoolId = dataObj[i].Pool2Id;
              games[j].matchup[k].team1PoolPlace = dataObj[i].Team1PlaceHolder;
              games[j].matchup[k].team2PoolPlace = dataObj[i].Team2PlaceHolder;
              games[j].matchup[k].locationAbb = dataObj[i].LocationAbb;
              games[j].matchup[k].courtName = dataObj[i].CourtName;
              games[j].matchup[k].team1Score = dataObj[i].TournTeamId1Score;
              games[j].matchup[k].team2Score = dataObj[i].TournTeamId2Score;
              games[j].matchup[k].gameDate = moment(dataObj[i].GameDate).format('MMM Do');
              games[j].matchup[k].startTime = dataObj[i].StartShortTime;
              games[j].matchup[k].team1PoolName = dataObj[i].Team1PoolName;
              games[j].matchup[k].team2PoolName = dataObj[i].Team1PoolName;
             k++;
           }
        }
      }
      var gamesData =  {
                    'htmlElementId': 1,
                    'games': games,
                    'championshipLevel': games[games.length - 1].level + 1,
                    'tournTeamList': [],
                    'poolsTeamsData': '',
                    'bracketSize': value
                };

           bracketTemp = bracketTemp + brackets.API.getHtmlTemplate(gamesData);
           });
           this.bracket = this._sanitizer.bypassSecurityTrustHtml('`' +  bracketTemp  + '`');
        });        
  }
  
    goToMenuPage() {
            this.navCtrl.remove(2);
            this.navCtrl.pop();   
        }

}
