import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectSportPage} from '../select-sport/select-sport'

@Component({
  templateUrl: 'build/pages/add-team/select-org/select-org.html'
})
export class SelectOrgPage {

  private nhOrgs: any = [
    {
      name: 'NH Spartans',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      boysTeams: 4,
      girlsTeams: 2
    },{
      name: 'NH Warriors',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      boysTeams: 4,
      girlsTeams: 2
    },{
      name: 'NH Knights',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      boysTeams: 4,
      girlsTeams: 2
    },{
      name: 'New England Storm',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      boysTeams: 4,
      girlsTeams: 2
    }
  ];;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToTournamentPage(){
    this.navCtrl.push(SelectSportPage);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
}
