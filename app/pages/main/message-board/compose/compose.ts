import {Component,Injectable,ViewChild} from '@angular/core';
import {NavController, ViewController, NavParams, ModalController,Tabs} from 'ionic-angular';
import {SelectComposeMessageTeamPage} from './select-team/select-team';
import {MainTabs} from '../../../main/tabs/main-tabs';
import {MessageBoardPage} from '../message-board';
import {LoginService} from '../../../../services/login';
import {MessageBoardService} from '../../../../services/messageboard';


@Injectable()
export class Message {  
 TeamId;
 Subject;
 Message;
 PostedUserId;
}

@Component({
  templateUrl: 'build/pages/main/message-board/compose/compose.html',
  providers : [MessageBoardService]
})

export class ComposeMessagePage {
  private followedTeams = [];
  private TeamName;
  private TeamId;
  private subject;
  private message;
  private filteredMessages = [];
  private messages = [];

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private _loginService : LoginService,
      private navParams: NavParams,
      private modalCtrl:ModalController,
      private msgboardService: MessageBoardService) {

        this.followedTeams = this._loginService.getFollowedTeams();
        this.TeamName = this.followedTeams.length==1?this.followedTeams[0].TeamName:this.navParams.get("Team").TeamName;
        this.TeamId = this.followedTeams.length==1?this.followedTeams[0].TeamId:this.navParams.get("Team").TeamId;
        console.log(this.TeamName);
        
  }

  goToSelectTeamPage(){
    this.navCtrl.push(SelectComposeMessageTeamPage)
  }
  
  dismiss() {    
     /* this.viewCtrl.dismiss();
      this.navCtrl.remove(1);
      this.navCtrl.pop();*/
      localStorage.setItem("TabIndex",'2'); 
      this.navCtrl.push(MainTabs);
  }

  compose() {
      var MsgObj = new Message();
      MsgObj.TeamId = this.TeamId;
      MsgObj.Subject = this.subject;
      MsgObj.Message = this.message;
      MsgObj.PostedUserId = this._loginService.getUserInfo().Context.User.UserId;
      console.log(MsgObj);
      this.msgboardService.addMessage(MsgObj)
      .subscribe(data => {
          console.log(data);
          this.getMessages();                
      })

  }
  getMessages(){
       console.log("getmsgs");
        this.msgboardService.getMessageList(this._loginService.getUserInfo().Context.User.UserId)
        .subscribe(data => {
            console.log(data);
            this.messages = data;
            this.filteredMessages = this.messages; 
            localStorage.setItem("TabIndex",'2'); 
            this.navCtrl.push(MainTabs);    
        })
  }
}
