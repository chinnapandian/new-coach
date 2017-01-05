import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {ComposeMessagePage} from './../compose/compose';
import {SelectComposeMessageTeamPage} from './../compose/select-team/select-team';
import {ReplyMessagePage} from './../compose/reply/reply';
import {LoginService} from '../../../../services/login';
import {MessageBoardService} from '../../../../services/messageboard';

@Component({
  templateUrl: 'build/pages/main/message-board/viewcomments/viewcomments.html',
  providers : [MessageBoardService]
})

export class ViewCommentsPage {
  private messages = [];
  private comments = [];
  private SelectedMessage;
  private search = false;
  private SearchKeyword = '';
  private dataLoading = true;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private _loginService: LoginService,
      private msgBoard : MessageBoardService,
      private navParams : NavParams) {
        this.SelectedMessage = this.navParams.get("Message");
        console.log(this.SelectedMessage);
        this.getMessages();
  }

  getMessages(){
        this.msgBoard.getMessageList(this._loginService.getUserInfo().Context.User.UserId)
        .subscribe(data => {

            this.messages = data;  
            this.messages.forEach(msg => {
                if (msg.MessageBoard.MsgId == this.SelectedMessage.MessageBoard.MsgId){
                    this.comments = msg.MessageBoardReply;
                    console.log(this.comments);
                }
            });       
        })
  }

 
  addNewReply(){
   let replyMessageModal = this.modalCtrl.create(ReplyMessagePage,{
         Message : this.SelectedMessage
      });
      replyMessageModal.present(); 
    }

  

   getFormattedDate(dt) {
        var date = new Date(dt);
        var weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return (weekdays[date.getDay()].toUpperCase() + ", " + (1 + date.getMonth()) + '/' + date.getDate());
    }

    convertToAmPm(dt){
            var ampm = (parseInt(dt.substr(0,2)) >= 12) ? "PM" : "AM";
            var hours;
            if (parseInt(dt.substr(0,2)) == 12)
              hours = 12;
            else if (parseInt(dt.substr(0,2)) > 12)
              hours =  parseInt(dt.substr(0,2))-12;
            else
              hours = parseInt(dt.substr(0,2));
            var min = dt.substr(2,3);
            return(hours + "" + min + " " + ampm);
    }


  dismiss() {
    this.viewCtrl.dismiss();
  }
}
