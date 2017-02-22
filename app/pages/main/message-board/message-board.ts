import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {ComposeMessagePage} from './compose/compose';
import {SelectComposeMessageTeamPage} from './compose/select-team/select-team';
import {ReplyMessagePage} from './compose/reply/reply';
import {LoginService} from '../../../services/login';
import {SearchMessagesPipe} from '../../../pipes/searchmessages';
import {MessageBoardService} from '../../../services/messageboard';
import {ViewCommentsPage} from './viewcomments/viewcomments';

@Component({
  templateUrl: 'build/pages/main/message-board/message-board.html',
  providers : [MessageBoardService],
  pipes :[SearchMessagesPipe]
})

export class MessageBoardPage {
  private followedTeams = [];
  private filteredMessages = [];
  private messages = [];
  private TeamId;
  private search = false;
  private SearchKeyword = '';
  private dataLoading = true;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private _loginService: LoginService,
      private msgBoard : MessageBoardService) {
        localStorage.setItem("TabIndex","2");
        this.followedTeams = this.removeDuplicates(this._loginService.getFollowedTeams(),"TeamId");
        this.TeamId = -1;
        console.log(this.followedTeams);

  }
  ionViewWillEnter(){
       this.getMessages();
  }
  doRefresh(){
     this.getMessages();
  }

  getMessages(){
       console.log("getmsgs");
        this.msgBoard.getMessageList(this._loginService.getUserInfo().Context.User.UserId)
        .subscribe(data => {
          this.dataLoading = false;
            this.messages = data;
            this.filteredMessages = this.messages;
            
        })
  }

  filterTeam(){
    this.filteredMessages = [];
    if(this.TeamId != -1){
     this.messages.forEach(msg => {
       if(msg.MessageBoard.TeamId == this.TeamId){
         this.filteredMessages.push(msg);
       }        
     });
    }else{
      this.filteredMessages = this.messages;
    }

  }

  toggleSearch(){
    this.search = this.search==false?true:false;
  }

  goToComposeMessagePage() {
    if(this.followedTeams.length==1){
      let composeMessageModal = this.modalCtrl.create(ComposeMessagePage);
      composeMessageModal.present();
    }else{
      let composeMessageModal = this.modalCtrl.create(SelectComposeMessageTeamPage);
      composeMessageModal.present();
    }
    
  }

  goToCommentsPage(message){
      let commentModal = this.modalCtrl.create(ViewCommentsPage,{
              Message : message
            });
       commentModal.present();
  }

  goToReplyMessagePage(message){
      console.log("reply");
      let replyMessageModal = this.modalCtrl.create(ReplyMessagePage,{
         Message : message
      });
      replyMessageModal.present();
  }

   getCount(msgid){
      var count = 0;
      this.messages.forEach(msg => {
        if(msg.MessageBoard.MsgId == msgid){
            count = msg.MessageBoardReply.length;
        }
      });
      return count;
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
 removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  onInput(key)
    {
      this.SearchKeyword = key.target.value.toString().toLowerCase();  
      this.search = (this.SearchKeyword=='')?false:true;
    }

  onCancel(key)
    {
      console.log("cance");
      this.search=false;
    } 
  dismiss() {
    localStorage.setItem("TabIndex",'2'); 
    this.viewCtrl.dismiss();
  }
}
