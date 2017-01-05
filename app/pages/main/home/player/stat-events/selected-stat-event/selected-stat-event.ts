import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams, AlertController} from 'ionic-angular';
import {RecordStatsPage} from "../../../../../record-stats/record-stats";
import {EditStatsPage} from "../../../../../record-stats/edit-record-stats";
import {LoginService} from "../../../../../../services/login";
import {MyPlayerConfigService} from "../../../../../../services/config";
import {GetPlayerStatsService} from  '../../../../../../services/getplayerstats';
import {TitlePipe} from  '../../../../../../pipes/title';
import {TempCurrDateService} from  '../../../../../../services/tempcurrdate';
var moment;

@Component({
    templateUrl: 'build/pages/main/home/player/stat-events/selected-stat-event/selected-stat-event.html',
    providers:[GetPlayerStatsService, TempCurrDateService],
    pipes: [TitlePipe]
})

export class SelectedStatEventPage {

    private statsView:string = 'total';
    private eventView: string = 'tournament';
    private basicHeadings: any = [
        'PTS',
        'REB',
        'AST',
        'STL',
        'TO',
        'BLK',
        'PF',
    ];

    private recordedStats: any = [
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
    ];

    private statsHeadings: any = [
        'PTS',
        'FGM',
        'FGA',
        'FG%',
        '3PM',
        '3PA',
        '3P%',
        'FTM',
        'FTA',
        'FT%',
        'REB',
        'AST',
        'STL',
        'BLK',
        'TOV',
        'PF',
    ];

    private avgStats: any = [
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
    ];

    private totalStats: any = [
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
    ];


    private myTournaments:any = [
        {
            name: 'Zero Gravity Battle of the Baskets',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            date: 'September 12 - 13, 2016',
            price: .99
        }, {
            name: 'Zero Gravity Fall Showdown',
            img: 'http://admin.tourneymachine.com/TournamentFiles/h201606081959263159a61ea9a0d2b48/e326e697caa6d92dc37d10362b42e0ef_article_image_2301185-640.png',
            date: 'September 28 - 29, 2016',
            price: .99
        }, {
            name: 'Zero Gravity King of the Coast',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h20140923064359771d8fd157e38db47/Indy.png',
            date: 'November 3 - 4, 2016',
            price: .99
        }, {
            name: 'Zero Gravity One Day Showcase',
            img: 'medal.svg',
            date: 'November 15 - 17, 2016',
            price: .99
        }
    ];
    
    private selectedTournament:any = [
        {
            name: 'Zero Gravity Battle of the Baskets',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            date: 'September 12 - 13, 2016',
        }
    ];

    private poolGames:any = [];

    private Stats_Tournament;
    private PlayerUserId;
    private PlayerFirstName;
    private PlayerLastName;
    private TeamId;
    private UserId;
    private today;
    private FollowedPlayers;
    private statValues = []
    private statCard: any = [
        {
        header: 'PPG',
        value: '0'
        },{
        header: 'RPG',
        value: '0'
        },{
        header: 'APG',
        value: '0'
        },{
        header: '2FG%',
        value: '0'
        },{
        header: '3FG%',
        value: '0'
        },{
        header: 'STL',
        value: '0'
        },{
        header: 'TO',
        value: '0'
        },{
        header: 'BLK',
        value: '0'
        }
    ];
    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private navParams:NavParams,
                private loginService:LoginService,
                private playerstatsService:GetPlayerStatsService,
                private alertCtrl:AlertController,
                private config:MyPlayerConfigService,
                private currdate:TempCurrDateService) {

            this.Stats_Tournament = this.navParams.get("Stats_Tournament");
            this.PlayerUserId = localStorage.getItem("SelectedPlayerId");
            this.TeamId = localStorage.getItem("SelectedPlayerTeamId");
           //this.TeamId=500;
            console.log(this.Stats_Tournament.TournamentId);
            console.log(this.PlayerUserId);
            console.log(this.TeamId);
            this.UserId = this.loginService.getUserInfo().Context.User.UserId;
            this.playerstatsService.getPlayerStats(this.UserId,this.Stats_Tournament.TournamentId,this.PlayerUserId,this.TeamId)    
                 .subscribe(data => {
                      console.log(data);
                      this.FollowedPlayers = data.PlayerStatsinfo[0];   
                      this.poolGames = data.PlayerGames;
                      var player = this.FollowedPlayers;
                      this.PlayerFirstName = player.CustodianPlayer.FirstName;
                      this.PlayerLastName = player.CustodianPlayer.LastName;
                      this.statValues = [player.PPG, player.RPG, player.APG, player.FG2, player.FG3, player.STL, player.TO, player.BLK];
            });
                           
     }  

    getStatValue(index2){   
            return this.statValues[index2];
        }

    goToRecordStatsPage(game){
      this.currdate.getTempCurrDate()
        .subscribe(data => {
            console.log(data);
            this.today = data.CurrDate;
         /*  console.log(data.CurrTime);
            var eventStartTime = new Date(game.StartDateTime);
            console.log(eventStartTime.valueOf());
            var eventEndTime = new Date(data.CurrTime);
            console.log(eventEndTime.valueOf());
            var dur = eventEndTime.valueOf() - eventStartTime.valueOf();
            console.log(dur);
            var duration = Math.round(((dur % 86400000) % 3600000) / 60000);
            console.log(duration);*/
            var eventStartTime = new Date(game.StartDateTime);
            var eventEndTime = new Date(data.CurrTime);
            var duration = eventStartTime.getTime() - eventEndTime.getTime();
            var durationInMinutes =  Math.round(duration / 60000);
            console.log(durationInMinutes);
            if(durationInMinutes<=5){
                    this.navCtrl.push(RecordStatsPage,{
                            Stats_TournamentId : this.navParams.get("Stats_Tournament").TournamentId,
                            Stats_Game : game
                    });
            }else{
                    let alert = this.alertCtrl.create({
                                                title: 'Record Statistics',
                                                subTitle: 'Stats can only be recorded for an ongoing game or if a game is about to start within the next 5 minutes',
                                                buttons:[{
                                                    text : 'OK',
                                                    handler: () => {
                                                    }
                                                    }],     
                                            });
                            alert.present();
            }
        })
    }

  goToViewStatsPage(game){
      this.navCtrl.push(EditStatsPage,{
          Stats_TournamentId : this.navParams.get("Stats_Tournament").TournamentId,
          Stats_Game : game
      });
    }

  getDate(dt) {
        let t = dt.substr(0, 10);
        let date=new Date(t);
         var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }
    
    getFormattedDate(dt) {
       var date = new Date(dt.toString().substr(0,10));
       var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
       var months =['January','February','March','April','May','June','July','August','September','October','November','December'];
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
      //  month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return (weekdays[date.getDay()]+ " " + day + "/" + month);
    }

  convertToAmPm(dt){
          var ampm = (parseInt(dt.substr(0,2)) >= 12) ? "PM" : "AM";
          var hours;
          if (parseInt(dt.substr(0,2)) == 12)
            hours = 12;
          else if (parseInt(dt.substr(0,2)) > 12)
            hours =  parseInt(dt.substr(0,2))-12;
          else
            hours = parseInt(dt.substr(0,2));
          var min = dt.substr(2,3);
          return(hours + "" + min + " " + ampm);
   }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
