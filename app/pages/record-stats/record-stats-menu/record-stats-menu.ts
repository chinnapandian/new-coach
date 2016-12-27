import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams, AlertController} from 'ionic-angular';
import {GetPlayerStatsService} from "../../../services/getplayerstats";
import {DeletePlayerStatsService} from "../../../services/deleteplayerstats";
import {RecordStatsPage} from "../../record-stats/record-stats";


@Component({
    templateUrl: 'build/pages/record-stats/record-stats-menu/record-stats-menu.html',
    providers : [GetPlayerStatsService,DeletePlayerStatsService]
})

export class RecordStatsMenuPage {

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
        
    
    private number: any = [
        (Math.floor(Math.random() * 10)),
    ];
    
    private menuView: string = 'history';
    private statsHistory: any = [];
    private statsvariables = [];
    private statsvalues = [];
    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private navParams:NavParams,
                private playerstats:GetPlayerStatsService,
                private deletestats:DeletePlayerStatsService,
                private alertCtrl:AlertController) {
       
        var playeruserid = localStorage.getItem("SelectedPlayerId");
        var tournid = this.navParams.get("Stats_TournamentId");
        var gameid = this.navParams.get("Stats_GameId");
        this.initializePlayerStatsVariablesValues();
        var statsdata = [];
        this.playerstats.getPlayerStatsHistory(playeruserid, gameid, tournid)
        .subscribe(data => {
           console.log(data);
           data.forEach(historyelement => {
               var historyfield;
               for(var keyname in historyelement){
                   if(historyelement[keyname]==1)
                       historyfield = keyname;
               }
               for(let i=0;i<this.statsvariables.length;i++){
                  if(historyfield== this.statsvariables[i]){
                        var eventStartTime = new Date(historyelement.Created);
                        console.log(eventStartTime.valueOf());
                        var eventEndTime = new Date();
                        console.log(eventEndTime.valueOf());
                        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
                        console.log(duration);
                        this.statsHistory.push({Text : this.statsvalues[i],
                                               HistoryId : historyelement.Id,
                                               Duration: Math.round(((duration % 86400000) % 3600000) / 60000)}); 
                       }
                   }
           }); 
        })

    }

  initializePlayerStatsVariablesValues(){
    this.statsvariables = ['pts2_Missed','pts2_Made','pts3_Missed','pts3_Made','FT_Missed','FT_Made',
                          'Assists','Steals','TurnOvers','Blocks','Off_Rebounds','Def_Rebounds','Pers_Fouls','Tech_Fouls'];

    this.statsvalues = ['Missed 2 Point FG','Made 2 Point FG','Missed 3 Point FG',
            'Made 3 Point FG','Missed Free Throw','Made  Free Throw','Assist','Steal','TurnOver',
            'Block','Offensive Rebound','Defensive Rebound','Personal Foul','Technical Foul'];
   }    
    
 deleteStats(text,historyid, index){
   //  historyid=2;index=2;
    let alert = this.alertCtrl.create({
                                        title: 'Delete Statistics',
                                        subTitle: 'Are you sure you want to undo the input for ' + text + ' ?',
                                        buttons:[{
                                            text : 'Yes',
                                            handler: () => {
                                                    this.deletestats.deletePlayerStats(historyid)
                                                        .subscribe(data => {
                                                            console.log(data);
                                                            this.statsHistory.splice(index,1);
                                                            this.navCtrl.remove(2);
                                                            this.navCtrl.remove(1);
                                                            this.navCtrl.pop();
                                                         //   this.navCtrl.push(RecordStatsPage);
                                                        })
                                              }
                                            },
                                            {
                                            text : 'Cancel',
                                            handler: () => {
                                                
                                              }
                                            }],     
                                      });
      alert.present();
    
 }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
