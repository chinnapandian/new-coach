import {Component} from '@angular/core';
import {App, NavController, ViewController, ModalController} from 'ionic-angular';
import {PurchaseEventPage} from './purchase/event/purchase-event'
import {EventSchedulePage} from "./event/event-schedule/schedule";
import {EventStandingsPage} from "./event/event-standings/standings";
import {LoginService} from '../../../services/login';
import {TempCurrDateService} from  '../../../services/tempcurrdate';
import {GroupPastTournamentsPipe} from '../../../pipes/grouppasttournaments';
import {GroupFutureTournamentsPipe} from '../../../pipes/groupfuturetournaments';
import {GroupCurrentTournamentsPipe} from '../../../pipes/groupcurrenttournaments';
import {SelectedEventTabs} from "./event/tabs/event-tabs";


@Component({
    templateUrl: 'build/pages/main/events/events.html',
    providers : [TempCurrDateService],
    pipes : [GroupPastTournamentsPipe, GroupCurrentTournamentsPipe, GroupFutureTournamentsPipe]
})

export class EventsPage {

    private scheduleView: string = "tournament";
    private timeView: string = 'ongoing';
    private RegUserTournaments:any = [];   
    private currentTournaments = [];
    private pastTournaments = [];
    private futureTournaments = []; 
    private dataLoading = true;
    private myLeagues:any = [];
    private today;
    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private _loginService : LoginService,
                private _tempCurrDate : TempCurrDateService,
                private appCtrl : App) {
         this.RegUserTournaments = this._loginService.getRegUserTournaments();
         console.log(this.RegUserTournaments);
         this.initialize();
    }

    // goToMessageBoardPage(){
    //   this.navCtrl.push(MessageBoardPage);
    // }
    initialize() {
         //Get current date ( for testing ) from db
        this._tempCurrDate.getTempCurrDate()
            .subscribe(data => {
                this.today = data;  
                console.log(this.today);
                // Fill past, current and future tournaments in respective arrays
                for (var i = 0; i < this.RegUserTournaments.length; i++) {
                    if ((this.RegUserTournaments[i].StartDate <= this.today) && (this.RegUserTournaments[i].EndDate >= this.today)) {
                    //to get all games of current tournaments
                    this.currentTournaments.push(this.RegUserTournaments[i]);                        
                    }
                    else if (this.RegUserTournaments[i].EndDate < this.today){
                        //to get all games of past tournaments
                        this.pastTournaments.push(this.RegUserTournaments[i]);
                    }
                    else if (this.RegUserTournaments.StartDate > this.today){
                        //to get all games of future tournaments
                        this.futureTournaments.push(this.RegUserTournaments[i]);
                    }
                }
                console.log(this.currentTournaments);
                console.log(this.pastTournaments);
                console.log(this.futureTournaments); 
                this.dataLoading = false;            
            });
      
    }

    getDate(dt) {
    let t = dt.substr(0, 10);
    return this.getFormattedDate(new Date(t));
    }
    
    getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
    }

    goToPurchaseEventPage() {
        let purchaseEventModal = this.modalCtrl.create(PurchaseEventPage);
        purchaseEventModal.present();
    }

    
    goToEventTabs(){
        console.log("entere");
        this.navCtrl.setRoot(SelectedEventTabs);
    }
    
    goToSelectedEventPage(tourn) {
        // this.navCtrl.push(SelectedEventPage);
        localStorage.setItem("SelectedTournamentId",tourn.TournamentId);
        localStorage.setItem("SelectedTournamentName",tourn.TournamentName);
        let y = this.modalCtrl.create(SelectedEventTabs);
        y.present();
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
