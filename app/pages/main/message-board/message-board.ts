import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {ComposeMessagePage} from './compose/compose'

@Component({
  templateUrl: 'build/pages/main/message-board/message-board.html'
})

export class MessageBoardPage {


  private messages: any = [
    {
      title: 'Practice Canceled',
      body: 'Practice has ben canceled today due to the snow storm. We will have our practice this tuesday at 5:00 instead.',
      author: 'Ryan Thomas',
      dateStamp: 'WED, 11/12',
      timeStamp: '12:34 PM',
      img: ''
    },
    {
      title: 'Meetup Location' ,
      body: 'Hey everyone! We are planning to meet in the 101a Walmart parking lot at 7:30 AM to carpool. If you do not plan to carpool then you do not have to come. See you Tomorrow!',
      author: 'Ryan Thomas',
      dateStamp: 'FRI, 11/12',
      timeStamp: '3:12 PM',
      img: ''
    },{
      title: 'Team Photo' ,
      body: 'Mike Smith',
      author: 'Ryan Thomas',
      dateStamp: 'FRI, 11/12',
      timeStamp: '10:01 AM',
      img: '../../../../../kids-playing.jpg'
    },
    {
      title: 'Tournament Entry Fee Needed For This Weekend',
      body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae. We will have our practice this tuesday at 5:00 instead.',
      author: 'Ryan Thomas',
      dateStamp: 'SAT, 11/12',
      timeStamp: '12:34 PM',
      img: ''
    },
    {
      title: 'Pasta Party Details',
      body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. We will have our practice this tuesday at 5:00 instead.',
      author: 'Frank Underwood',
      dateStamp: 'SUN, 11/12',
      timeStamp: '12:34 PM',
      img: '../../../../../kids-playing.jpg'
    },
  ];


  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  // goToComposeMessagePage(){
  //   this.navCtrl.push(ComposeMessagePage);
  // }

  goToComposeMessagePage() {
    let composeMessageModal = this.modalCtrl.create(ComposeMessagePage);
    composeMessageModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
