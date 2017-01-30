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
import {SubscriptionListService} from  '../../../services/subscriptionlist';
import {MyPlayerConfigService} from "../../../services/config";



@Component({
    templateUrl: 'build/pages/main/events/events.html',
    providers : [TempCurrDateService,SubscriptionListService],
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
                private appCtrl : App,
                private subscriptionlist:SubscriptionListService,
                private config:MyPlayerConfigService) {

          /*   var currentDate = this.addDays(new Date(),0);           
             currentDate.setHours(0, 0, 0, 0);
             this.today=currentDate.toJSON();*/
             localStorage.setItem("TabIndex","1");
             this.today = this.config.getCurrDate();
             this.initialize();   
    }
    ionViewWillEnter(){
        this.initialize();  
    }
    
    addDays(theDate, days) {
            return new Date(theDate.getTime() + days*24*60*60*1000);
    }

    // goToMessageBoardPage(){
    //   this.navCtrl.push(MessageBoardPage);
    // }

    initialize() {
                this.timeView='ongoing';
                var RegUserTournaments=[];
                this.currentTournaments=[];
                this.pastTournaments=[];
                this.futureTournaments=[];
                // Fill past, current and future tournaments in respective arrays
                if(this._loginService.getRegUserTournaments() == null){         
                        this.currentTournaments = []; 
                        this.pastTournaments=[];
                        this.futureTournaments=[];     
                        this.dataLoading = false;
                }else{
                    RegUserTournaments = this.removeDuplicates(this._loginService.getRegUserTournaments(),"TournamentId");
                    for (var i = 0; i < RegUserTournaments.length; i++) {
                            if ((RegUserTournaments[i].StartDate <= this.today) && (RegUserTournaments[i].EndDate >= this.today)) {
                            //to get all games of current tournaments
                            this.currentTournaments.push(RegUserTournaments[i]);                        
                            }
                            else if (RegUserTournaments[i].EndDate < this.today){
                                //to get all games of past tournaments
                                this.pastTournaments.push(RegUserTournaments[i]);
                            }
                            else if (RegUserTournaments[i].StartDate > this.today){
                                //to get all games of future tournaments
                                this.futureTournaments.push(RegUserTournaments[i]);
                            }
                    }
                    
                    console.log(this.currentTournaments.length);
                    console.log(this.pastTournaments);
                    console.log(this.futureTournaments); 
                     this.dataLoading = false;
                }                             
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
         let EventModal = this.modalCtrl.create(SelectedEventTabs);
         EventModal.present();
       // this.navCtrl.setRoot(SelectedEventTabs);
    }
    
    goToSelectedEventPage(tourn) {
        console.log(tourn);
        var TournamentPrice,SeasonPrice,TournProdId,SeasonProdId;
        
        localStorage.setItem("SelectedTournamentId",tourn.TournamentId);
        localStorage.setItem("SelectedTournamentName",tourn.TournamentName);
        if(tourn.isRegistered == 1){
                let y = this.modalCtrl.create(SelectedEventTabs);
                y.present();
        }else{
              this.subscriptionlist.getSubscriptionsList()
                .subscribe(data =>{
                    console.log(data);
                     TournamentPrice = data[0].Rate;
                     SeasonPrice = data[1].Rate;
                     TournProdId = data[0].ProductId;
                     SeasonProdId = data[1].ProductId;

                    console.log(TournamentPrice);
                    console.log(SeasonPrice);
                    let purchaseEventModal = this.modalCtrl.create(PurchaseEventPage,
                    {
                        SelectedTournament : tourn,
                        TournamentPurchasePrice : TournamentPrice,
                        SeasonPurchasePrice : SeasonPrice,
                        TournamentProductId : TournProdId,
                        SeasonProductId : SeasonProdId
                    });
                    purchaseEventModal.present();
            })
        }
        
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
