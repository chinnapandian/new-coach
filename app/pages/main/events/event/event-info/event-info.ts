import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/main/events/event/event-info/event-info.html'
})

export class EventInfoPage {

    private statCard: any = [
        {
            header: 'PPG',
            value: '12.3'
        },{
            header: 'RPG',
            value: '5.3'
        },{
            header: 'APG',
            value: '2.9'
        },{
            header: 'FG%',
            value: '34.6%'
        },{
            header: '3P%',
            value: '10.3%'
        },{
            header: 'FT%',
            value: '72.1%'
        }
    ];


    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }


}
