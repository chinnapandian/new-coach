import {Component,Injectable} from '@angular/core';
import {NavController, ViewController, ModalController,LoadingController, ToastController, NavParams} from 'ionic-angular';
import {RecordStatsMenuPage} from "./record-stats-menu/record-stats-menu";
import {LoginService} from "../../services/login";
import {MyPlayerConfigService} from "../../services/config";
import {AddPlayerStatsService} from "../../services/addplayerstats";
import {FillPipe} from '../../pipes/fill';

@Injectable()
export class RecordPlayerStatsData {
  SubmittedUserId;
  PlayerUserId;
  TournamentId;
  GameId;
  pts2_Missed;
  pts2_Made;
  pts3_Missed;
  pts3_Made;
  FT_Missed;
  FT_Made;
  Steals;
  TurnOvers;
  Blocks;
  Off_Rebounds;
  Def_Rebounds;
  Pers_Fouls;
  Tech_Fouls;
}

@Component({
    templateUrl: 'build/pages/record-stats/record-stats.html',
    providers : [AddPlayerStatsService],
    pipes:[FillPipe]
})

export class RecordStatsPage {

    private statsHeadings: any = [
        'PTS',
        'REB',
        'AST',
        'STL',
        'TO',
        'BLK',
    ];

    private recordedStats: any = [0,0,0,0,0,0];


    private playerStatsObj;
    private regUserPlayers;
    private StatsVariables = [];
    private StatsValues = [];
    private StatsText = [];
    private AvatarPath;
    private Game;
    private foulcount=0;
    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private toastCtrl: ToastController,
                private navParams:NavParams,
                private loginService:LoginService,
                private _config:MyPlayerConfigService,
                private _playerstats:AddPlayerStatsService,
                private loadingCtrl:LoadingController) {

        this.intializeStatsVariables_Values();
        console.log(localStorage.getItem("SelectedPlayerId"));
        var followedPlayers = this.loginService.getRegUserPlayers();
        this.Game = this.navParams.get("Stats_Game");
        followedPlayers.forEach(player => {
            if(player.PlayerUserId == localStorage.getItem("SelectedPlayerId")){
                this.AvatarPath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/" + player.Avatar;
                console.log(this.AvatarPath);
            }
        });

    }

    intializeStatsVariables_Values(){
         
       this.StatsVariables = ['pts2_Missed','pts2_Made','pts3_Missed','pts3_Made','FT_Missed','FT_Made','Assists',
                                'Steals','TurnOvers','Blocks','Off_Rebounds','Def_Rebounds','Pers_Fouls','Tech_Fouls'];
       this.StatsValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
       this.StatsText = ['Missed 2 Point FG','Made 2 Point FG','Missed 3 Point FG',
            'Made 3 Point FG','Missed Free Throw','Made  Free Throw','Assist','Steal','TurnOver',
            'Block','Offensive Rebound','Defensive Rebound','Personal Foul','Technical Foul'];
    }

    saveStats(variable){
        this.presentToast(variable);       
        this.playerStatsObj =new RecordPlayerStatsData;
        let index=0;
        for(let i=0;i<this.StatsVariables.length;i++){
            if(this.StatsVariables[i] == variable){
                this.StatsValues[i] = 1;
            }
        } 
        this.playerStatsObj.PlayerUserId = localStorage.getItem("SelectedPlayerId");
        this.playerStatsObj.TournamentId = this.navParams.get("Stats_TournamentId");
        this.playerStatsObj.GameId = this.Game.GameId;
        this.playerStatsObj.SubmittedUserId = this.loginService.getUserInfo().Context.User.UserId;
        this.playerStatsObj.pts2_Missed = this.StatsValues[index++];
        this.playerStatsObj.pts2_Made = this.StatsValues[index++];
        this.playerStatsObj.pts3_Missed = this.StatsValues[index++];
        this.playerStatsObj.pts3_Made = this.StatsValues[index++];
        this.playerStatsObj.FT_Missed = this.StatsValues[index++];
        this.playerStatsObj.FT_Made = this.StatsValues[index++];
        this.playerStatsObj.Assists = this.StatsValues[index++];
        this.playerStatsObj.Steals = this.StatsValues[index++];
        this.playerStatsObj.TurnOvers = this.StatsValues[index++];
        this.playerStatsObj.Blocks = this.StatsValues[index++];
        this.playerStatsObj.Off_Rebounds = this.StatsValues[index++];
        this.playerStatsObj.Def_Rebounds = this.StatsValues[index++];
        this.playerStatsObj.Pers_Fouls = this.StatsValues[index++];
        this.playerStatsObj.Tech_Fouls = this.StatsValues[index++];
        this.intializeStatsVariables_Values();
        console.log(this.playerStatsObj);

        this._playerstats.addPlayerStats(this.playerStatsObj)
        .subscribe(data =>{            
            
            console.log("player stats");
            console.log(data);
            this.recordedStats = [data.Points, data.REBPercent, data.ASTCount, data.STL, data.TOCount, data.BLK];
            console.log(this.recordedStats);
            if(variable=='Pers_Fouls' || variable=='Tech_Fouls')
                this.foulcount++;

            
        })  
            
    }

    ionViewWillEnter() {
        var data;
        console.log(localStorage.getItem("UpdatedStats"));
        data = JSON.parse(localStorage.getItem("UpdatedStats"));
        console.log(data);
        if(localStorage.getItem("FoulCount") == "0")
             this.foulcount=0;
        else
             this.foulcount=parseInt(localStorage.getItem("FoulCount"));
        if(data ==  null || data ==  'null')
           this.recordedStats = [0,0,0,0,0,0];
        else
        {
            this.recordedStats = [data.Points, data.REBPercent, data.ASTCount, data.STL, data.TOCount, data.BLK];
            localStorage.setItem("UpdatedStats",null);
        }
        console.log(this.recordedStats);
        
     }

    presentToast(variable) {
        var msg;
        for(let i=0;i<this.StatsVariables.length;i++){
                  if(variable== this.StatsVariables[i]){
                       msg = this.StatsText[i];
        }}
       
        let toast = this.toastCtrl.create({
            message:  msg + ' in the books',
            duration: 1800,
            position: 'bottom',
            showCloseButton: false
            // closeButtonText: 'Undo'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            console.log('Undid');
        });
        toast.present();
        
    }

    goToMenu() {
        console.log('gotomenu');
        localStorage.setItem("FoulCount",this.foulcount.toString());
       this.navCtrl.push(RecordStatsMenuPage,
            {
                Stats_GameId : this.Game.GameId,
                Stats_TournamentId : this.navParams.get("Stats_TournamentId")
            });

        // let x = this.modalCtrl.create(RecordStatsMenuPage);
        // x.present();
    };
 
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
