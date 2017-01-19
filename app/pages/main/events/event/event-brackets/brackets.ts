import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, PopoverController, NavParams} from 'ionic-angular';
import {BracketDivisionsPage} from './divisions/select-div';
import {BracketImagePage} from "./bracketimage";
import {BracketService} from '../../../../../services/bracket';
import {LoginService} from '../../../../../services/login';
import {FillPipe} from '../../../../../pipes/fill';
import {GroupBracketData} from '../../../../../pipes/groupbracketdata';
import {DomSanitizationService} from '@angular/platform-browser';
import * as moment from 'moment';

declare var brackets: any;

@Component({
    templateUrl: 'build/pages/main/events/event/event-brackets/brackets.html',
    providers: [BracketService],
    pipes : [FillPipe, GroupBracketData]
})

export class EventBracketsPage {
    private bracketGamesOfRound = [];
    private RoundIndex = 0;
    private dataLoading = true;
    private showImage = false;
    public bracketGames1:any =
        {
            round1: [
                {
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                },{
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                },{
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                },{
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                }
            ],
            round2: [
                {
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver ',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                },{
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                }
            ],
            round3: [
                {
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                }
            ]
        }
    ;
    private SelectedTournamentName;
    private SelectedTournamentId;
    private bracketGames = [];
    private maxround=0;
    private divisionFilter = "All Divisions";
    private divisionId = 0;
    private selectedBracketGames;
    private divisions = [];
    private uniqueDivisions =[];
    private fullBracketGames =[];
     public bracket: any;

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private popoverCtrl:PopoverController,
                private modalCtrl:ModalController,
                private _bracketService : BracketService,
                private loginService:LoginService,
                private navParams : NavParams,
                private _sanitizer: DomSanitizationService) {

       
        this.SelectedTournamentName = localStorage.getItem("SelectedTournamentName");
        this.SelectedTournamentId = localStorage.getItem("SelectedTournamentId");
         this.getBracketData();
         this.displayBracketImage();
        
    }
 displayBracketImage(){
      this._bracketService.getBracketsDetails(this.SelectedTournamentId, this.divisionId ,"BasketBall")
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

    getBracketData(){
        this.dataLoading=true;
        console.log(this.divisionId);
        this.maxround=0;
        this._bracketService.getBracketsDetails(this.SelectedTournamentId, this.divisionId, "BasketBall")
                .subscribe(data => {
                    if(this.divisionId ==0) this.fullBracketGames =data;
                    this.bracketGames = data;
                    console.log(data);
                    this.bracketGames.forEach(bracketgame => {
                        if(bracketgame.BracketLevel > this.maxround)
                            this.maxround = bracketgame.BracketLevel;
                    });
                    this.showBracketGames(0);          
                    this.dataLoading=false;

                })
    }
    getDayOfDate(dt) {
        var weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return (weekdays[new Date(dt).getDay()]);
      //  console.log(moment(dt).format('MMM Do'));*/
     //   return moment(dt).format('MMM Do');
    }
 
    getOrdinal(n) {
        var s=["th","st","nd","rd"],
        v=n%100;
        return n+(s[(v-20)%10]||s[v]||s[0]);
    }

    presentPopover(event) {
         let divisionPopover = this.popoverCtrl.create(BracketDivisionsPage,{
            BracketGames : this.fullBracketGames,
            SelectedDivision : this.divisionFilter
        });
        divisionPopover.onDidDismiss(data => {
                console.log(data);
                this.divisionFilter=data.DivisionName;
                this.divisionId=data.DivisionId;
                this.bracketGamesOfRound = [];
                this.getBracketData();            
         });
        divisionPopover.present({
            ev: event
         });       
    }

     openBracketImage() {
         this.showImage = (this.showImage == true)?false:true;
  /*       this.navCtrl.push(BracketImagePage,
         {
             SelectedDivisionName : this.divisionFilter,
             SelectedDivisionId : this.divisionId
         }); */
    //    let bracketsModal = this.modalCtrl.create(BracketImagePage);
    //    bracketsModal.present();
    }

    dismiss() {
        localStorage.setItem("TabIndex",'1');
        this.viewCtrl.dismiss();
    }

    showBracketGames(roundindex){
        this.bracketGamesOfRound = [];
        this.bracketGames.forEach(bracketgame => {
            this.RoundIndex = roundindex;
            if(bracketgame.BracketLevel == (roundindex+1))
                  this.bracketGamesOfRound.push(bracketgame);
            });
    }
    
}
