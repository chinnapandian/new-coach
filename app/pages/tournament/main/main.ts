import {Component} from '@angular/core';
import {ViewController, ModalController, ActionSheetController} from 'ionic-angular';


@Component({
    templateUrl: 'build/pages/tournament/main/main.html'
})

export class TournamentMainPage {

    private thisTournament:any = [
        {
            name: 'Zero Gravity Battle of the Baskets',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            date: 'September 12 - 13, 2016'
        }
    ];

    constructor(private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private actionCtrl:ActionSheetController) {
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
