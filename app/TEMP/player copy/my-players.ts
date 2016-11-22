import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectedPlayerPage} from './selected-player/tabs'
import {AddPlayerPage} from './add-player/add-player'

@Component({
  templateUrl: 'build/pages/selected-team/my-players/my-players.html'
})
export class MyPlayersPage {
  
  private statsView: string = 'average';

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


  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      public modalCtrl: ModalController) {
  }

  // goToSelectedPlayerPage(){
  //   this.navCtrl.push(SelectedPlayerPage);
  // }

  goToSelectedPlayerPage(){
    let selectedPlayerModal = this.modalCtrl.create(SelectedPlayerPage);
    selectedPlayerModal.present();
  }

  goToAddPlayerPage(){
    let addPlayerModal = this.modalCtrl.create(AddPlayerPage);
    addPlayerModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
