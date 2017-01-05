import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, PopoverController, NavParams} from 'ionic-angular';
import {BracketDivisionsPage} from './divisions/select-div';
import {BracketImagePage} from "./bracketimage";
import {BracketService} from '../../../../../services/bracket';
import {LoginService} from '../../../../../services/login';
import {FillPipe} from '../../../../../pipes/fill';
import {GroupBracketData} from '../../../../../pipes/groupbracketdata';
import * as moment from 'moment';

@Component({
    templateUrl: 'build/pages/main/events/event/event-brackets/brackets.html',
    providers: [BracketService],
    pipes : [FillPipe, GroupBracketData]
})

export class EventBracketsPage {
    private bracketGamesOfRound = [];
    private RoundIndex = 0;
    private dataLoading = true;
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

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private popoverCtrl:PopoverController,
                private modalCtrl:ModalController,
                private _bracketService : BracketService,
                private loginService:LoginService,
                private navParams : NavParams) {

       
        this.SelectedTournamentName = localStorage.getItem("SelectedTournamentName");
        this.SelectedTournamentId = localStorage.getItem("SelectedTournamentId");
         this.getBracketData();
        
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
       /* var weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return (weekdays[new Date(dt).getDay()]);
        console.log(moment(dt).format('MMM Do'));*/
        return moment(dt).format('MMM Do');
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
         this.navCtrl.push(BracketImagePage,
         {
             SelectedDivisionName : this.divisionFilter,
             SelectedDivisionId : this.divisionId
         });
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
