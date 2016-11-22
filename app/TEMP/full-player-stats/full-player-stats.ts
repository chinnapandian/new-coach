import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/main/home/player/player-profile/full-player-stats/full-player-stats.html'
})

export class FullPlayerStatsPage {

    private statsView: string = 'total';


    private x: any = {
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

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }

    // dismiss() {
    //     this.viewCtrl.dismiss();
    // }
}
