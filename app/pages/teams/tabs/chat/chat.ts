import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/teams/tabs/chat/chat.html'
})
export class ChatPage {
  
  // private images: any = [
  //   {
  //     img: "../../../../../kids-playing.jpg"
  //   }
  // ];

  private messages: any = [
    {
      title: 'Practice Canceled',
      body: 'Practice has ben canceled today due to the snow storm. We will have our practice this tuesday at 5:00 instead.',
      author: 'Ryan Thomas',
      dateStamp: 'Monday, July 12, 2016',
      timeStamp: '12:34 PM',
      img: ''
    },
    {
      title: 'Meetup Location' ,
      body: 'Hey everyone! We are planning to meet in the 101a Walmart parking lot at 7:30 AM to carpool. If you do not plan to carpool then you do not have to come. See you Tomorrow!',
      author: 'Ryan Thomas',
      dateStamp: 'Friday, March 7, 2016',
      timeStamp: '3:12 PM',
      img: ''
    },{
      title: 'Team Photo' ,
      body: 'Congrats on an undefeated wekeend!',
      author: 'Ryan Thomas',
      dateStamp: 'Friday, March 8, 2016',
      timeStamp: '10:01 AM',
      img: '../../../../../kids-playing.jpg'
    },
    {
      title: 'Tournament Entry Fee Needed For This Weekend',
      body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae. We will have our practice this tuesday at 5:00 instead.',
      author: 'Ryan Thomas',
      dateStamp: 'Saturday, March 8, 2016',
      timeStamp: '12:34 PM',
      img: ''
    },
    {
      title: 'Pasta Party Details',
      body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. We will have our practice this tuesday at 5:00 instead.',
      author: 'Frank Underwood',
      dateStamp: 'Wednesday, February 4, 2016',
      timeStamp: '12:34 PM',
      img: '../../../../../kids-playing.jpg'
    },
  ];


  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController) {
  }

  // goToMessageBoardPage(){
  //   this.navCtrl.push(MessageBoardPage);
  // }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
