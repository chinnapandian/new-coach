import {Component,Injectable} from '@angular/core';
import {NavController, ViewController, NavParams, ModalController,App} from 'ionic-angular';
import {SelectComposeMessageTeamPage} from '../select-team/select-team';
import {MainTabs} from '../../../../main/tabs/main-tabs';
import {MessageBoardPage} from '../../message-board';
import {LoginService} from '../../../../../services/login';
import {MessageBoardService} from '../../../../../services/messageboard';

@Injectable()
export class Message {  
 MsgId;
 Message;
 PostedUserId;
}

@Component({
  templateUrl: 'build/pages/main/message-board/compose/reply/reply.html',
  providers : [MessageBoardService]
})

export class ReplyMessagePage {
  private followedTeams = [];
  private TeamName;
  private TeamId;
  private subject;
  private message;
  private OriginalMessage;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private _loginService : LoginService,
      private navParams: NavParams,
      private modalCtrl:ModalController,
      private msgboardService: MessageBoardService,
      private app:App) {

         this.OriginalMessage = this.navParams.get("Message");
        
  }

  goToSelectTeamPage(){
    this.navCtrl.push(SelectComposeMessageTeamPage)
  }
  
  dismiss() {
         this.viewCtrl.dismiss();

  }
  compose() {
      var MsgObj = new Message();
      MsgObj.MsgId = this.navParams.get("Message").MessageBoard.MsgId;
      MsgObj.Message = this.message;
      MsgObj.PostedUserId =  this._loginService.getUserInfo().Context.User.UserId;
      console.log(MsgObj);
      this.msgboardService.replyMessage(MsgObj)
      .subscribe(data => {
         /* localStorage.setItem("TabIndex",'2'); 
          this.navCtrl.push(MainTabs);*/
           this.viewCtrl.dismiss();
      })

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
}
