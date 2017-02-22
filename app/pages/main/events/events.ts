import { Component } from '@angular/core';
import { App, NavController, ViewController, ModalController } from 'ionic-angular';
import { PurchaseEventPage } from './purchase/event/purchase-event'
import { EventSchedulePage } from "./event/event-schedule/schedule";
import { EventStandingsPage } from "./event/event-standings/standings";
import { LoginService } from '../../../services/login';
import { TempCurrDateService } from '../../../services/tempcurrdate';
import { GroupPastTournamentsPipe } from '../../../pipes/grouppasttournaments';
import { GroupFutureTournamentsPipe } from '../../../pipes/groupfuturetournaments';
import { GroupCurrentTournamentsPipe } from '../../../pipes/groupcurrenttournaments';
import { SelectedEventTabs } from "./event/tabs/event-tabs";
import { SubscriptionListService } from '../../../services/subscriptionlist';
import { MyPlayerConfigService } from "../../../services/config";
import { TournamentsListService } from '../../../services/tournamentlist';
import { SearchEventsPipe } from '../../../pipes/searchevents';
import {GroupFutureTournOrgPipe} from '../../../pipes/groupfuturetournorg';
import {GroupPastTournOrgPipe} from '../../../pipes/grouppasttournorg';
import {GroupCurrentTournOrgPipe} from '../../../pipes/groupcurrenttournorg';


@Component({
    templateUrl: 'build/pages/main/events/events.html',
    providers: [TempCurrDateService, SubscriptionListService,TournamentsListService],
    pipes: [GroupPastTournamentsPipe, GroupCurrentTournamentsPipe, GroupFutureTournamentsPipe, 
    SearchEventsPipe,GroupFutureTournOrgPipe,GroupPastTournOrgPipe,GroupCurrentTournOrgPipe]
})

export class EventsPage {

    private scheduleView: string = "tournament";
    private timeView: string = 'ongoing';
    private RegUserTournaments: any = [];
    private currentTournaments = [];
    private pastTournaments = [];
    private futureTournaments = [];
    private dataLoading = true;
    private myLeagues: any = [];
    private today;
    private hideSearchBar = true;
    private SearchKeyword = '';
    private UserRole;
    constructor(private navCtrl: NavController,
        private viewCtrl: ViewController,
        private modalCtrl: ModalController,
        private _loginService: LoginService,
        private _tempCurrDate: TempCurrDateService,
        private appCtrl: App,
        private subscriptionlist: SubscriptionListService,
        private config: MyPlayerConfigService,
        private tournlist:TournamentsListService) {

        /*   var currentDate = this.addDays(new Date(),0);           
           currentDate.setHours(0, 0, 0, 0);
           this.today=currentDate.toJSON();*/
        localStorage.setItem("TabIndex", "1");
        this.today = this.config.getCurrDate();
        this.UserRole = this._loginService.getUserInfo().Context.User.UserRole.toLowerCase();
    }
    ionViewWillEnter() {
        this.initialize();
    }
doRefresh(){
   this.initialize(); 
}

    addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    // goToMessageBoardPage(){
    //   this.navCtrl.push(MessageBoardPage);
    // }

    initialize() {
        this.timeView = 'ongoing';
        var RegUserTournaments = [];
        this.currentTournaments = [];
        this.pastTournaments = [];
        this.futureTournaments = [];
        this.tournlist.getTournamentsList(this._loginService.getUserInfo().Context.User.UserId,this._loginService.getUserInfo().Context.User.UserRole)
        .subscribe(data => {
                    this.dataLoading = false;
                    RegUserTournaments = data;
            // Fill past, current and future tournaments in respective arrays
                    if (RegUserTournaments == null) {
                        
                        this.currentTournaments = [];
                        this.pastTournaments = [];
                        this.futureTournaments = [];
                        
                    } else {
                        console.log(RegUserTournaments.length);
                        console.log(RegUserTournaments);
                        for (var i = 0; i < RegUserTournaments.length; i++) {
                            if ((RegUserTournaments[i].StartDate <= this.today) && (RegUserTournaments[i].EndDate >= this.today)) {
                                //to get all games of current tournaments
                                console.log('current'+i);
                                this.currentTournaments.push(RegUserTournaments[i]);
                            }
                            else if (RegUserTournaments[i].EndDate < this.today) {
                                //to get all games of past tournaments
                                 console.log('past'+i);
                                this.pastTournaments.push(RegUserTournaments[i]);
                            }
                            else if (RegUserTournaments[i].StartDate > this.today) {
                                //to get all games of future tournaments
                                 console.log('future'+i);
                                this.futureTournaments.push(RegUserTournaments[i]);
                            }
                        }

                        console.log(this.currentTournaments.length);
                        console.log(this.pastTournaments);
                        console.log(this.futureTournaments);
                        
                    }
        })
       
    }

    removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
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

    goToEventTabs() {
        console.log("entere");
        let EventModal = this.modalCtrl.create(SelectedEventTabs);
        EventModal.present();
        // this.navCtrl.setRoot(SelectedEventTabs);
    }

    goToSelectedEventPage(tourn) {
        console.log(tourn);
        localStorage.setItem("SelectedTournamentId", tourn.TournamentId);
        localStorage.setItem("SelectedTournamentName", tourn.TournamentName);
        localStorage.setItem("FromEventsTab","true");
        let SelectedEventTabsModal = this.modalCtrl.create(SelectedEventTabs);
        SelectedEventTabsModal.present();


    }

    goToPurchaseEventPage(tourn) {
        console.log(tourn);
        localStorage.setItem("SelectedTournamentId", tourn.TournamentId);
        localStorage.setItem("SelectedTournamentName", tourn.TournamentName);

        let purchaseEventModal = this.modalCtrl.create(PurchaseEventPage,
            {
                SelectedTournament: tourn
            });
        purchaseEventModal.present();


    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

    setSearchBar() {
        console.log("tes");
        this.hideSearchBar = (this.hideSearchBar == true) ? false : true;
    }
    change() {
        this.SearchKeyword = '';
    }
    onInput(key) {
        console.log("input");
        this.SearchKeyword = key.target.value.toString().toLowerCase();
    }
}
