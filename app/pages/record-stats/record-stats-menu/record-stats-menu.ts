import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/record-stats/record-stats-menu/record-stats-menu.html'
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

    private statsHistory: any = [
        'Made 2 Point FG',
        'Offensive Foul',
        'Assist',
        'Defensive Rebound',
        'Turnover',
        'Missed 2 Point FG',
        'Made Free Throw',
        'Missed Free Throw',
        'Offensive Rebound',
        'Block',
        'Block',
        'Made 2 Point FG'
    ];
    
    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
