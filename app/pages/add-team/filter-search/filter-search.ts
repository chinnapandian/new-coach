import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {AddTeamPage} from '../add-team';

@Component({
  templateUrl: 'build/pages/add-team/filter-search/filter-search.html'
})
export class FilterSeachPage {

  private sport: string = 'basketball';
  private state: string = 'nh';
  private gender: string = 'boys';
  private type: string = 'travel';

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
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  goToAddTeamPage(){
    this.navCtrl.push(AddTeamPage);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
}
