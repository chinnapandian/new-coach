import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {ComposePage} from './compose/compose'

@Component({
  templateUrl: 'build/pages/message-board/message-board.html'
})
export class MessageBoardPage {

  private selectedTeam: any = [
    {
      name: 'Spartans Boys 12U',
      coach: 'Ryan Wilson',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      sport: 'basketball',
      foo: false
    }
  ];

  private messages: any = [
    {
      title: 'Practice Canceled',
      body: 'Practice has ben canceled today due to the snow storm. We will have our practice this tuesday at 5:00 instead.',
      author: 'Ryan Thomas',
      dateStamp: 'Monday, July 12, 2016',
      timeStamp: '12:34 PM'
    },
    {
      title: 'Meetup Location' ,
      body: 'Hey everyone! We are planning to meet in the 101a Walmart parking lot at 7:30 AM to carpool. If you do not plan to carpool then you do not have to come. See you Tomorrow!',
      author: 'Ryan Thomas',
      dateStamp: 'Friday, March 7, 2016',
      timeStamp: '3:12 PM'
    },
    {
      title: 'Tournament Entry Fee Needed For This Weekend',
      body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae. We will have our practice this tuesday at 5:00 instead.',
      author: 'Ryan Thomas',
      dateStamp: 'Saturday, March 8, 2016',
      timeStamp: '12:34 PM'
    },
    {
      title: 'Pasta Party Details',
      body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. We will have our practice this tuesday at 5:00 instead.',
      author: 'Frank Underwood',
      dateStamp: 'Wednesday, February 4, 2016',
      timeStamp: '12:34 PM'
    },
  ];

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) {
  
  }

  goToComposePage(){
    let composeModal = this.modalCtrl.create(ComposePage);
    composeModal.present();
  }

}
