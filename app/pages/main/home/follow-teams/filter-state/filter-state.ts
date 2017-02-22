import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, LoadingController} from 'ionic-angular';
import {FollowTeamsPage} from '../follow-teams';
import {MainTabs} from '../../../tabs/main-tabs';
import {EventOperatorsListService} from "../../../../../services/geteventoperators";
import {SearchEventOperatorsPipe} from '../../../../../pipes/searcheventoperators';


@Component({
  templateUrl: 'build/pages/main/home/follow-teams/filter-state/filter-state.html',
  providers: [EventOperatorsListService],
  pipes : [SearchEventOperatorsPipe]
})


export class FilterTeamStatePage {

  private eventoperators: any = [];
  private SearchKeyword='';
  private dataLoading =true;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private eventOperatorsList : EventOperatorsListService) {
        this.getData();
   
  }
ionViewWillEnter(){
       this.getData();
}

getData(){ 
        this.eventOperatorsList.getEventOperators()
        .subscribe(data=>{
           this.dataLoading = false;
            console.log(data);
            this.eventoperators = data;
           
        }); 
  
}
 
  goToFollowTeamsPage(eventoperator){
    
    this.navCtrl.push(FollowTeamsPage,{
      SelectedOperator : eventoperator
    });
  }

  onInput(key)
    {
        this.SearchKeyword = key.target.value;
        console.log(this.SearchKeyword);
    }
  change(){
    this.SearchKeyword = '';
  }
  dismiss() {
    localStorage.setItem('homeView','teams');
    localStorage.setItem("TabIndex",'0');
    this.navCtrl.pop();
  }
}
