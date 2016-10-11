import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/scorekeeper/scorekeeper.html'
})

export class scorekeeperPage {
    

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }


    // goToSelectDivisionPage() {
    //     let selectDivisionModal = this.modalCtrl.create(SelectDivisionPage);
    //     selectDivisionModal.present();
    // };

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
