import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectDivisionPage} from '../select-division/select-division'


@Component({
  templateUrl: 'build/pages/tournament/standings/standings.html'
})

export class StandingsPage {

  private teams:any = [
    {
      name: 'Spartans Boys 12U',
      w: (Math.floor(Math.random() * 10)),
      l: (Math.floor(Math.random() * 10)),
      ps: (Math.floor(Math.random() * 70)),
      pa: (Math.floor(Math.random() * 70)),
      pd: (Math.floor(Math.random() * 70))
    },{
      name: 'NS Hoops - Paul',
      w: (Math.floor(Math.random() * 8)),
      l: (Math.floor(Math.random() * 6)),
      ps: (Math.floor(Math.random() * 70)),
      pa: (Math.floor(Math.random() * 70)),
      pd: (Math.floor(Math.random() * 70))
    },{
      name: 'BDS - Brown 5',
      w: (Math.floor(Math.random() * 3)),
      l: (Math.floor(Math.random() * 13)),
      ps: (Math.floor(Math.random() * 70)),
      pa: (Math.floor(Math.random() * 70)),
      pd: (Math.floor(Math.random() * 70))
    },{
      name: 'NE Playmakers - Latimer',
      w: (Math.floor(Math.random() * 3)),
      l: (Math.floor(Math.random() * 33)),
      ps: (Math.floor(Math.random() * 70)),
      pa: (Math.floor(Math.random() * 70)),
      pd: (Math.floor(Math.random() * 70))
    },
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToSelectDivisionPage() {
    let selectDivisionModal = this.modalCtrl.create(SelectDivisionPage);
    selectDivisionModal.present();
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
