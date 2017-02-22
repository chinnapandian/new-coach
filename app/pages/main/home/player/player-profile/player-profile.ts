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
