import {Component,Injectable} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {LoginService} from  '../../../../../services/login';
import {AddProductSubscriptionService} from  '../../../../../services/addproductsubscription';
import {EventsPage} from '../../events';
import {MainTabs} from '../../../tabs/main-tabs';
import {SubscriptionListService} from  '../../../../../services/subscriptionlist';
import {FilterTournamentsPipe} from  '../../../../../pipes/filtertournament';
import {SelectedEventTabs} from "../../event/tabs/event-tabs";

@Injectable()
export class AddProductData {  
  UserId;
  SeasonId;
  TournamentId;
  TeamId;
  ProductId;
  Rate;
  Promocode;
  Discount;
  PurchasePrice;
  PlayerPromoCode;
  PlayerDiscount;
  PlayerPurchasePrice;
  IsRedeemed;
}

@Component({
    templateUrl: 'build/pages/main/events/purchase/event/purchase-event.html',
    providers:[AddProductData, AddProductSubscriptionService,SubscriptionListService],
    pipes:[FilterTournamentsPipe]
})

export class PurchaseEventPage {

    private tournament:any = [
        {
            name: 'Zero Gravity One Day Showcase',
            date: 'May 8 - 9, 2016',
            img: 'http://admin.tourneymachine.com/TournamentFiles/h201606081959263159a61ea9a0d2b48/e326e697caa6d92dc37d10362b42e0ef_article_image_2301185-640.png',
            price: 1.99
        },
    ];

    private bullet: string = '../../../../medal-check.svg';

    private purchaseView: string = 'tournament';

    private bulletList:any = [
        'Full Team Schedules',
        'Divisional Brackets',
        'Pool Standings',
        'Score Updates',
        'Pool & Bracket Updates',
        'Schedule Change Notifications',
        'Scorekeeper Access',
    ];

    private bulletList2:any = [
        'Full Team Schedules',
        'Divisional Brackets',
        'Pool Standings',
    ];


    // private packs:any = [
    //     {
    //         name: 'Personal Pass (Season)',
    //         info: '1 Parent Pass, 1 Player Pass',
    //         description: 'Get access for you and your player for the entire tournament season.',
    //         img: '../../../../personal-pack.svg',
    //         price: 2.99
    //     }, {
    //         name: 'Family Pass (Season)',
    //         info: '2 Parent Passes, 2 Player Passes',
    //         description: 'Get access for you and your player for the entire tournament season.',
    //         img: '../../../../family-pack.svg',
    //         price: 4.99
    //     }, {
    //         name: 'Team Pass (Season)',
    //         info: '15 Parent Passes, 15 Player Passes',
    //         description: 'Get access for you and your entire team',
    //         img: '../../../../team-pack.svg',
    //         price: 14.99
    //     },
    // ];

    private season:any = [];


    //      img: '../../../new-medal.svg',
    private SelectedTournamentName;
    private SelectedTournamentId;
    private SelectedTournamentStartDate;
    private SelectedTournamentEndDate;
    private SelectedSeasonName;
    private SelectedSeasonId;
    private SelectedCircuitName;
    private TournamentPurchasePrice;
    private SeasonPurchasePrice;
    private SeasonStartDate;
    private SeasonEndDate;
    private TournamentProductId;
    private SeasonProductId;
    private showHideTournFeaturesHeader=false;
     private showHideSeasonFeaturesHeader=false;
     private showHideIncludedTournsHeader= [];
     private tournamentsList =[];
     private seasonsList =[];

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private navParams:NavParams,
                private loginservice:LoginService,
                private subscriptionlist:SubscriptionListService,
                private _addProductData:AddProductData,
                private _addProductSubscription:AddProductSubscriptionService) {
       
       var seasons =[];this.tournamentsList =[];
        var TournamentPrice,SeasonPrice,TournProdId,SeasonProdId;

       console.log(this.navParams.get('Ongoing_Upcoming_Tourns'));      
       if(this.navParams.get("SelectedTournament")!=null){
          this.tournamentsList.push(this.navParams.get("SelectedTournament"));
       } else if(this.navParams.get("Ongoing_Upcoming_Tourns")!=null){
           this.tournamentsList = this.navParams.get("Ongoing_Upcoming_Tourns");
       }
          this.tournamentsList.forEach(tourn => {
                seasons.push({SeasonId : tourn.SeasonId,
                                        SeasonName : tourn.SeasonName,
                                        CircuitName : tourn.CircuitName,
                                        SeasonStartDate : tourn.SeasonStartDate,
                                        SeasonEndDate : tourn.SeasonEndDate,
                                        RegisteredSeasonId:tourn.RegisteredSeasonId})           
            });
            this.seasonsList = this.removeDuplicates(seasons,"SeasonId");
            console.log(this.seasonsList);
           var index=0;
           this.seasonsList.forEach(team => {
             this.showHideIncludedTournsHeader[index]=false;
             index++;
           });
   /*    if(this.navParams.get("SelectedTournament")!=null){
                this.SelectedSeasonName = this.navParams.get("SelectedTournament").SeasonName;
                this.SelectedCircuitName = this.navParams.get("SelectedTournament").CircuitName;
                this.SelectedSeasonId = this.navParams.get("SelectedTournament").SeasonId;

                this.SeasonStartDate = this.navParams.get("SelectedTournament").SeasonStartDate;
                this.SeasonEndDate = this.navParams.get("SelectedTournament").SeasonEndDate;
       }*/

        this.subscriptionlist.getSubscriptionsList()
                        .subscribe(data =>{
                            console.log(data);
                            this.TournamentPurchasePrice = data[0].Rate;
                            this.SeasonPurchasePrice = data[1].Rate;
                            this.TournamentProductId = data[0].ProductId;
                            this.SeasonProductId = data[1].ProductId;

                            console.log(this.TournamentPurchasePrice);
                            console.log(this.SeasonPurchasePrice);
            });

        
    /*    var regusertournaments = this.loginservice.getRegUserTournaments();
        console.log(regusertournaments);
        regusertournaments.forEach(tourn => {
            if(tourn.SeasonId ==  this.SelectedSeasonId)
                season.push(tourn);
            
        });
        this.season = this.removeDuplicates(season,"TournamentId");*/

       

    }

    showHideTournFeatures(){
        if(this.showHideTournFeaturesHeader==false)
            this.showHideTournFeaturesHeader=true;
        else
            this.showHideTournFeaturesHeader=false;
        return this.showHideTournFeaturesHeader;
    }
     showHideSeasonFeatures(){
        if(this.showHideSeasonFeaturesHeader==false)
            this.showHideSeasonFeaturesHeader=true;
        else
            this.showHideSeasonFeaturesHeader=false;
        return this.showHideSeasonFeaturesHeader;
    }
showHideIncludedTournsFeatures(index){
        if(this.showHideIncludedTournsHeader[index]==false)
            this.showHideIncludedTournsHeader[index]=true;
        else
            this.showHideIncludedTournsHeader[index]=false;
        return this.showHideIncludedTournsHeader[index];
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
 
     getSeasonFormattedDate(d) {
       var date = new Date(d.toString().substr(0,10));
       var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
       var months =['January','February','March','April','May','June','July','August','September','October','November','December'];
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return (months[date.getMonth()] + ' ' + day + ', ' + year);
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
    // goToTournamentPage() {
    //   this.navCtrl.pop();
    //
    //   let tournamentModal = this.modalCtrl.create(TournamentPage);
    //   tournamentModal.present();
    //
    // };

    dismiss() {
        this.viewCtrl.dismiss();
        localStorage.setItem("TabIndex","1");
         console.log(parseInt(localStorage.getItem("TabIndex")));
         this.navCtrl.setRoot(MainTabs);
      /*     this.viewCtrl.dismiss();
            this.navCtrl.remove(this.viewCtrl.index);
           this.navCtrl.remove(this.viewCtrl.index-1);
           this.navCtrl.remove(this.viewCtrl.index-2);
            this.navCtrl.remove(this.viewCtrl.index-3);*/

    }

    checkout(productid, tournamentid, seasonid, productrate) {
            this._addProductData.UserId=this.loginservice.getUserInfo().Context.User.UserId;
            this._addProductData.SeasonId=seasonid;
            this._addProductData.TournamentId=tournamentid;
            this._addProductData.ProductId=productid;
            this._addProductData.IsRedeemed=0
            this._addProductData.Promocode="";
            this._addProductData.Rate=productrate;
            this._addProductData.PurchasePrice=0;
            this._addProductData.PlayerPromoCode="";
            this._addProductData.PlayerDiscount=0;
            this._addProductData.PlayerPurchasePrice=0;
            this._addProductData.TeamId = 0;
            console.log(this._addProductData);
            this._addProductSubscription.addProductSubscription(this._addProductData)
            .subscribe(data=> {
                    console.log(data);
                    this.loginservice.setRegUserTournaments(data.RegUserTournaments);
                    this.loginservice.setRegUserPlayers(data.RegUserPlayers);
                   this.viewCtrl.dismiss();
                    localStorage.setItem("TabIndex","1");
                    this.navCtrl.setRoot(MainTabs);

             })
  }

  goToAllEvents(){
        localStorage.setItem("TabIndex","1");
        this.viewCtrl.dismiss();
        this.navCtrl.setRoot(MainTabs);
  }

  goToEventPage(tourn){
       localStorage.setItem("SelectedTournamentId", tourn.TournamentId);
       localStorage.setItem("SelectedTournamentName", tourn.TournamentName);
       localStorage.setItem("FromEventsTab","false");
       let EventModal = this.modalCtrl.create(SelectedEventTabs);
         EventModal.present();

  }
}

