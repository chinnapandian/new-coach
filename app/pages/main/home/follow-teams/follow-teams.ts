import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/main/home/follow-teams/follow-teams.html'
})

export class FollowTeamsPage {

  private teamGender: string = 'boys';

  private spartansOrg: any = [
    {
      name: 'Spartans',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    }
  ];

  private spartans: any = [
    {
      name: 'NH Boys U12 Spartans',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    },{
      name: 'NH Boys U8 Warriors',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    },{
      name: 'NH Boys 8th Grade Knights',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    },{
      name: 'New England Storm (U16 - Boys)',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    },{
      name: 'NH Boys 10U Cowboys',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    }
  ];

  private warriors: any = [
    {
      name: 'NH Boys U12 Spartans',
      img: 'https://pbs.twimg.com/profile_images/415334320619130880/jz1mwqe_.jpeg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    },{
      name: 'NH Boys U8 Warriors',
      img: 'https://pbs.twimg.com/profile_images/415334320619130880/jz1mwqe_.jpeg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    },{
      name: 'NH Boys 8th Grade Knights',
      img: 'https://pbs.twimg.com/profile_images/415334320619130880/jz1mwqe_.jpeg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    },{
      name: 'New England Storm (U16 - Boys)',
      img: 'https://pbs.twimg.com/profile_images/415334320619130880/jz1mwqe_.jpeg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    },{
      name: 'NH Boys 10U Cowboys',
      img: 'https://pbs.twimg.com/profile_images/415334320619130880/jz1mwqe_.jpeg',
      coach: 'Ryan Howard',
      id: '5H7Q21'
    }
  ];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
