import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, PopoverController, NavParams} from 'ionic-angular';
import {BracketDivisionsPage} from './divisions/select-div';
import {BracketImagePage} from "./bracketimage";
import {BracketService} from '../../../../../services/bracket';
import {LoginService} from '../../../../../services/login';
import {FillPipe} from '../../../../../pipes/fill';

@Component({
    templateUrl: 'build/pages/main/events/event/event-brackets/brackets.html',
    providers: [BracketService],
    pipes : [FillPipe]
})

export class EventBracketsPage {
    private bracketGamesOfRound = [];
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
    private divisionFilter;

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private popoverCtrl:PopoverController,
                private modalCtrl:ModalController,
                private _bracketService : BracketService,
                private loginService:LoginService,
                private navParams : NavParams) {

   //     var games = this.loginService.getTournamentBrackets();
   //     console.log(games);
         this.divisionFilter=(this.navParams.get('divisionFilter')==null?'All Divisions':this.navParams.get('divisionFilter'));
        this.SelectedTournamentName = localStorage.getItem("SelectedTournamentName");
        this.SelectedTournamentId = localStorage.getItem("SelectedTournamentId");
         this.getBracketData();
        
    }

    getBracketData(){
        this._bracketService.getBracketsDetails(this.SelectedTournamentId, null, "BasketBall")
                .subscribe(data => {
                    this.bracketGames = data;
                    console.log(data);
                    this.bracketGames.forEach(bracketgame => {
                        if(bracketgame.BracketLevel > this.maxround)
                            this.maxround = bracketgame.BracketLevel;
                    });
                    this.showBracketGames(0);
                })
    }
    getDayOfDate(dt) {
        var weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return (weekdays[new Date(dt).getDay()]);
    }

    presentPopover(event) {
         let divisionPopover = this.popoverCtrl.create(BracketDivisionsPage,{
            BracketGames : this.bracketGames,
            SelectedDivision : this.divisionFilter
        });
        divisionPopover.onDidDismiss(data => {
                console.log(data);
                this.divisionFilter=data;
                this.getBracketData();            
         });
        divisionPopover.present({
            ev: event
         });       
    }

     openBracketImage() {
        let bracketsModal = this.modalCtrl.create(BracketImagePage);
        bracketsModal.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    showBracketGames(roundindex){
        this.bracketGamesOfRound = [];
        this.bracketGames.forEach(bracketgame => {

            if(bracketgame.BracketLevel == (roundindex+1))
                  this.bracketGamesOfRound.push(bracketgame);
            });
    }
    
}
