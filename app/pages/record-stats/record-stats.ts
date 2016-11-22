import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, ToastController} from 'ionic-angular';
import {RecordStatsMenuPage} from "./record-stats-menu/record-stats-menu"

@Component({
    templateUrl: 'build/pages/record-stats/record-stats.html'
})

export class RecordStatsPage {

    private statsHeadings: any = [
        'PTS',
        'REB',
        'AST',
        'STL',
        'TOV',
        'BLK',
    ];

    private recordedStats: any = [
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
    ];



    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private toastCtrl: ToastController) {
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

    goToMenu() {
        this.navCtrl.push(RecordStatsMenuPage);

        // let x = this.modalCtrl.create(RecordStatsMenuPage);
        // x.present();
    };

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
