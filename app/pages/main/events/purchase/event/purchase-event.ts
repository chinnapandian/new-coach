import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {LoginService} from  '../../../../../services/login';

@Component({
    templateUrl: 'build/pages/main/events/purchase/event/purchase-event.html'
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
    private SelectedTournamentStartDate;
    private SelectedTournamentEndDate;
    private SelectedSeasonName;
    private SelectedSeasonId;
    private SelectedCircuitName;
    private TournamentPurchasePrice;
    private SeasonPurchasePrice;

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private navParams:NavParams,
                private loginservice:LoginService) {
       
        var season =[];
        this.SelectedTournamentName = this.navParams.get("SelectedTournament").TournamentName;
        this.SelectedTournamentStartDate = this.navParams.get("SelectedTournament").StartDate;
        this.SelectedTournamentEndDate = this.navParams.get("SelectedTournament").EndDate;
        this.SelectedSeasonName = this.navParams.get("SelectedTournament").SeasonName;
        this.SelectedCircuitName = this.navParams.get("SelectedTournament").CircuitName;
        this.SelectedSeasonId = this.navParams.get("SelectedTournament").SeasonId;

        this.TournamentPurchasePrice = this.navParams.get("TournamentPurchasePrice");
        this.SeasonPurchasePrice = this.navParams.get("SeasonPurchasePrice");
        var regusertournaments = this.loginservice.getRegUserTournaments();
        regusertournaments.forEach(tourn => {
            if(tourn.SeasonId ==  this.SelectedSeasonId)
                season.push(tourn);
            
        });
        this.season = this.removeDuplicates(season,"TournamentId");
        console.log(this.TournamentPurchasePrice);
       

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
    }
}

