import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectedStatEventPage} from "../stat-events/selected-stat-event/selected-stat-event";
import {UpdatePlayerPage} from "../../../../main/home/update-player/update-player";
import {LoginService} from "../../../../../services/login";
import {AvatarsListService} from  '../../../../../services/getavatars';
import {MyPlayerConfigService} from  '../../../../../services/config';
import {TitlePipe} from  '../../../../../pipes/title';
//import {FullStatsPage} from "./full-stats/full-stats"    
//import {FullPlayerStatsPage} from "./full-player-stats/full-player-stats"

@Component({
    templateUrl: 'build/pages/main/home/player/player-profile/player-profile.html',
    providers :[AvatarsListService],
    pipes:[TitlePipe]
})

export class PlayerProfilePage {
    private imagePath;
    private boyavatars = [];
    private girlavatars = [];
 //   private statsView:string = 'total';

    private timeView:string = 'ongoing';

    private eventView: string = 'tournament';

    private statsHeadings: any = [
        'PTS',
        'REB',
        'AST',
        'STL',
        'TO',
        'BLK',
    ];
    
    private quickStatsHeadings: any = [
        'PPG',
        'FG%',
        '3P%',
        'FT%',
        'RPG',
        'APG',
    ];

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
            header: 'FG%',
            value: '0%'
        },{
            header: '3P%',
            value: '0%'
        },{
            header: 'FT%',
            value: '0%'
        }
    ];

    private statGP: any = [
        {
            header: 'Games Played',
            value: '0'
        }
    ];

    private statPTS: any = [
        {
            header: 'Points',
            value: '0'
        }
    ];

    private statFG: any = [
        {
            header: 'FGM',
            value: '0'
        },{
            header: 'FGA',
            value: '0'
        },{
            header: 'FG%',
            value: '0'
        }
    ];

    private statFG2: any = [
        {
            header: '2PM',
            value: '0'
        },{
            header: '2PA',
            value: '0'
        },{
            header: '2P%',
            value: '0'
        }
    ];

    private statFG3: any = [
        {
            header: '3PM',
            value: '0'
        },{
            header: '3PA',
            value: '0'
        },{
            header: '3P%',
            value: '0'
        }
    ];

    private statFT: any = [
        {
            header: 'FTM',
            value: '0'
        },{
            header: 'FTA',
            value: '0'
        },{
            header: 'FT%',
            value: '0'
        }
    ];

    private statRB: any = [
        {
            header: 'OREB',
            value: '0'
        },{
            header: 'DREB',
            value: '0'
        },{
            header: 'REB%',
            value: '0'
        }
    ];

    private statBC: any = [
        {
            header: 'AST',
            value: '0'
        },{
            header: 'STL',
            value: '0'
        },{
            header: 'TOV',
            value: '0'
        },{
            header: 'BLK',
            value: '0'
        }
    ];

    private quickStatsData: any = [
        (Math.floor(Math.random() * 300) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 10) / 10),
    ];
    
    private statsData: any = [
        (Math.floor(Math.random() * 300) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 10) / 10),
    ];

    private x: any =
    {
        points: [
            'Points'
        ],
        FG: [
            'Field Goals Made',
            'Field Goals Attempted',
            'Field Goal Percent'
        ],
        PT2: [
            '2 Point Field Goals Made',
            '2 Point Field Goals Attempted',
            '2 Point Field Goal Percentage'
        ],
        PT3: [
            '3 Point Field Goals Made',
            '3 Point Field Goals Attempted',
            '3 Point Field Goal Percentage'
        ],
        FT: [
            'Free Throws Made',
            'Free Throws Attempted',
            'Free Throws Percentage'
        ],
        RB: [
            'Offensive Rebounds',
            'Defensive Rebounds',
            'Total Rebounds'
        ],
        BC: [
            'Assists',
            'Steals',
            'Turnovers',
            'Blocks'
        ],
        Fouls: [
            'Total Fouls'
        ]
    };


    // private playerStats: any = [
    //     {
    //         title: 'Points',
    //         total: (Math.floor(Math.random() * 10)),
    //         average: (Math.floor(Math.random() * 10)),
    //     },{
    //         title: 'Field Goals',
    //         total: (Math.floor(Math.random() * 10)),
    //         average: (Math.floor(Math.random() * 10)),
    //     },{
    //         title: 'Field Goal',
    //         total: (Math.floor(Math.random() * 10)),
    //         average: (Math.floor(Math.random() * 10)),
    //     },
    //     ];

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
            img: 'medal-shadow.png',
            date: 'November 15 - 17, 2016',
            price: .99
        }
    ];


    private SelectedPlayerId;
    private followedPlayers;
    private SelectedPlayer;
    private SelectedPlayerStats;
    
    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private loginService:LoginService,
                private avatars:AvatarsListService,
                private _config:MyPlayerConfigService) {

        var playertabIndex = this.navCtrl.parent;
        playertabIndex.select(parseInt(localStorage.getItem("PlayerTabIndex")));
        this.SelectedPlayerStats = JSON.parse(localStorage.getItem("SelectedPlayerStats"));

        this.SelectedPlayerId = localStorage.getItem("SelectedPlayerId");  
        JSON.parse(localStorage.getItem("Standings"));         
        this.followedPlayers = this.loginService.getRegUserPlayers();
        this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/";
        
        this.followedPlayers.forEach(player => {
            if(player.PlayerUserId == this.SelectedPlayerId){
                this.SelectedPlayer = player;  
                // set player statistics
                var statCardValues = [this.SelectedPlayerStats.PPG,this.SelectedPlayerStats.RPG,this.SelectedPlayerStats.APG,
                        this.SelectedPlayerStats.FGPerCent,this.SelectedPlayerStats.P3PerCent,this.SelectedPlayerStats.FTPerCent];
                for(let i=0;i<this.statCard.length;i++)
                     this.statCard[i].value = statCardValues[i];  
                this.statGP[0].value = this.SelectedPlayerStats.GamesPlayed;
                this.statPTS[0].value = this.SelectedPlayerStats.Points;
                var statFGValues = [this.SelectedPlayerStats.FGM,this.SelectedPlayerStats.FGA,this.SelectedPlayerStats.FGPerCent];
                for(let i=0;i<this.statFG.length;i++)
                     this.statFG[i].value = statFGValues[i]; 
                var statFG2Values = [this.SelectedPlayerStats.PM2,this.SelectedPlayerStats.PA2,this.SelectedPlayerStats.P2PerCent];
                for(let i=0;i<this.statFG2.length;i++)
                     this.statFG2[i].value = statFG2Values[i];
                var statFG3Values = [this.SelectedPlayerStats.PM3,this.SelectedPlayerStats.PA3,this.SelectedPlayerStats.P3PerCent];
                for(let i=0;i<this.statFG3.length;i++)
                     this.statFG3[i].value = statFG3Values[i];
                var statFTValues = [this.SelectedPlayerStats.FTM,this.SelectedPlayerStats.FTA,this.SelectedPlayerStats.FTPercent];
                for(let i=0;i<this.statFT.length;i++)
                     this.statFT[i].value = statFTValues[i];
                var statRBValues = [this.SelectedPlayerStats.OREB,this.SelectedPlayerStats.DREB,this.SelectedPlayerStats.REBPercent];
                for(let i=0;i<this.statRB.length;i++)
                     this.statRB[i].value = statRBValues[i];
                var statBCValues = [this.SelectedPlayerStats.ASTCount,this.SelectedPlayerStats.STLCount,this.SelectedPlayerStats.TOCount,this.SelectedPlayerStats.BLKCount];
                for(let i=0;i<this.statBC.length;i++)
                     this.statBC[i].value = statBCValues[i];

            }
        });
    }

     goToSelectedStatEventPage(){
       this.navCtrl.push(SelectedStatEventPage);
     }

    goToFullStatsPage(){
  //   this.navCtrl.push(FullPlayerStatsPage);
    }
    
    goToEditPlayer() {
        let playerModal = this.modalCtrl.create(UpdatePlayerPage,{
            
        });
        playerModal.present();
    }

    dismiss() {
    localStorage.setItem('TabIndex', '0');
    localStorage.setItem('homeView', 'players');

        localStorage.setItem("SelectedPlayerId",'');
         this.viewCtrl.dismiss();
              this.navCtrl.remove(this.viewCtrl.index);
              this.navCtrl.pop();
    }
}
