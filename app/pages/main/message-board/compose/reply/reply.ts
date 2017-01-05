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

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private _loginService : LoginService,
      private navParams: NavParams,
      private modalCtrl:ModalController,
      private msgboardService: MessageBoardService,
      private app:App) {

      
        
  }

  goToSelectTeamPage(){
    this.navCtrl.push(SelectComposeMessageTeamPage)
  }
  
  dismiss() {
      localStorage.setItem("TabIndex",'2'); 
      this.navCtrl.push(MainTabs);

  }
  compose() {
      var MsgObj = new Message();
      MsgObj.MsgId = this.navParams.get("Message").MessageBoard.MsgId;
      MsgObj.Message = this.message;
      MsgObj.PostedUserId =  this.navParams.get("Message").MessageBoard.PostedUserId;
      console.log(MsgObj);
      this.msgboardService.replyMessage(MsgObj)
      .subscribe(data => {
          localStorage.setItem("TabIndex",'2'); 
          this.navCtrl.push(MainTabs);
      })

  }
}
