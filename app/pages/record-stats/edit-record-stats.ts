import {Component,Injectable} from '@angular/core';
import {NavController, ViewController, ModalController, ToastController, NavParams} from 'ionic-angular';
import {RecordStatsMenuPage} from "./record-stats-menu/record-stats-menu";
import {LoginService} from "../../services/login";
import {MyPlayerConfigService} from "../../services/config";
import {AddPlayerStatsService} from "../../services/addplayerstats";
import {GetPlayerStatsService} from "../../services/getplayerstats";

@Injectable()
export class PlayerStatsData {
  SubmittedUserId;
  Id;
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
    templateUrl: 'build/pages/record-stats/edit-record-stats.html',
    providers : [AddPlayerStatsService,GetPlayerStatsService]
})

export class EditStatsPage {

    private statsHeadings: any = [
        'PTS',
        'REB',
        'AST',
        'STL',
        'TO',
        'BLK',
    ];

    private recordedStats: any = [];

    private range = [];
    private minrangevalue = 0;
    private maxrangevalue = 25;
    private playerStatsObj;
    private regUserPlayers;
    private StatsVariables = [];
    private StatsValues = [];
    private AvatarPath;
    private Stats_TournamentId;
    private Stats_PlayerStatsId;
    private Stats_Game;
    private made2;
    private made3;
    private missed2;
    private missed3;
    private madeft;
    private missedft;
    private assist;
    private steal;
    private turn;
    private block;
    private defrebound;
    private offrebound;
    private perfouls;
    private techfouls;


    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private toastCtrl: ToastController,
                private navParams:NavParams,
                private loginService:LoginService,
                private _config:MyPlayerConfigService,
                private _playerstats:AddPlayerStatsService,
                private _getplayerstats:GetPlayerStatsService) {

    //    this.intializeStatsVariables_Values();
        console.log(localStorage.getItem("SelectedPlayerId"));
        this.Stats_TournamentId=this.navParams.get("Stats_TournamentId");
        this.Stats_PlayerStatsId=this.navParams.get("Stats_Game").myPlayerStatsId;
        this.Stats_Game=this.navParams.get("Stats_Game");
        this.getPlayerStats();
        this.fillrange();

        var followedPlayers = this.loginService.getRegUserPlayers();
        followedPlayers.forEach(player => {
            if(player.PlayerUserId == localStorage.getItem("SelectedPlayerId")){
                this.AvatarPath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/" + player.Avatar;
                console.log(this.AvatarPath);
            }
        });

    }

  /* intializeStatsVariables_Values(){
       this.StatsVariables = ['pts2_Missed','pts2_Made','pts3_Missed','pts3_Made','FT_Missed','FT_Made','Assists',
                                'Steals','TurnOvers','Blocks','Off_Rebounds','Def_Rebounds','Pers_Fouls','Tech_Fouls'];
       this.StatsValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }*/
    fillrange(){
        for(let i=0;i<25;i++){
            this.range[i] = i;
        }
    }

    onChange(){
        this.recordedStats = [((this.made2*2) + (this.made3*3) + this.madeft), this.offrebound+this.defrebound,
                                this.assist, this.steal, this.turn, this.block];
    }

    getPlayerStats(){
        this._getplayerstats.getPlayerStatsById(this.Stats_PlayerStatsId)
        .subscribe(data =>{
                 console.log(data);
                this.missed2 = data[0].pts2_Missed;
                this.made2 = data[0].pts2_Made;
                this.missed3 = data[0].pts3_Missed;
                this.made3 = data[0].pts3_Made;
                this.missedft = data[0].FT_Missed;
                this.madeft = data[0].FT_Made;
                this.assist = data[0].Assists;
                this.steal = data[0].Steals;
                this.turn = data[0].TurnOvers;
                this.block = data[0].Blocks;
                this.offrebound = data[0].Off_Rebounds;
                this.defrebound = data[0].Def_Rebounds;
                this.perfouls = data[0].Pers_Fouls;
                this.techfouls = data[0].Tech_Fouls;
                this.recordedStats = [((this.made2*2) + (this.made3*3) + this.madeft), this.offrebound+this.defrebound,
                                this.assist, this.steal, this.turn, this.block];
        })
    }

    saveStats(){
        console.log("savestats");
        this.playerStatsObj = new PlayerStatsData;
        this.playerStatsObj.Id = this.Stats_PlayerStatsId;
        this.playerStatsObj.SubmittedUserId = this.loginService.getUserInfo().Context.User.UserId;
        this.playerStatsObj.pts2_Missed = this.missed2;
        this.playerStatsObj.pts2_Made = this.made2;
        this.playerStatsObj.pts3_Missed = this.missed3;
        this.playerStatsObj.pts3_Made = this.made3;
        this.playerStatsObj.FT_Missed = this.missedft;
        this.playerStatsObj.FT_Made = this.madeft;
        this.playerStatsObj.Assists = this.assist;
        this.playerStatsObj.Steals = this.steal;
        this.playerStatsObj.TurnOvers = this.turn;
        this.playerStatsObj.Blocks = this.block;
        this.playerStatsObj.Off_Rebounds = this.offrebound;
        this.playerStatsObj.Def_Rebounds = this.defrebound;
        this.playerStatsObj.Pers_Fouls = this.perfouls;
        this.playerStatsObj.Tech_Fouls = this.techfouls;
        console.log(this.playerStatsObj);
        this._playerstats.editPlayerStats(this.playerStatsObj,this.Stats_PlayerStatsId)
        .subscribe(data =>{
            console.log("player stats");
            console.log(data);
            this.viewCtrl.dismiss();
          //  this.intializeStatsVariables_Values();
        })        
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Nice! 2 Points in the books',
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


    dismiss() {
        this.viewCtrl.dismiss();
    }
}