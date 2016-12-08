import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, LoadingController} from 'ionic-angular';
import {FollowTeamsPage} from '../follow-teams';
import {StatesListService} from "../../../../../services/getstates";
import {SearchStatesPipe} from '../../../../../pipes/searchstates';


@Component({
  templateUrl: 'build/pages/main/home/follow-teams/filter-state/filter-state.html',
  providers: [StatesListService],
  pipes : [SearchStatesPipe]
})


export class FilterTeamStatePage {

  private states: any = [];
  private SearchKeyword='';
  private dataLoading =true;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private statesList : StatesListService) {

        this.statesList.getStatesList()
        .subscribe(data=>{
            console.log(data);
            this.states = data;
            this.dataLoading = false;
        });    
  }

 
  goToFollowTeamsPage(state){
    this.navCtrl.push(FollowTeamsPage,{
      SelectedState : state
    });
  }

  onInput(key)
    {
        this.SearchKeyword = key.target.value;
        console.log(this.SearchKeyword);
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
