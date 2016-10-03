import {Component} from '@angular/core';
import {NavController, ModalController, ActionSheetController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {SettingsListPage} from '../settings/settings-list';
import {TournamentDetailsPage} from '../tournament/details/details';
import {AddTeamPage} from '../add-team/add-team';
import {SelectSportPage} from '../add-team/select-sport/select-sport';
import {SelectOrgPage} from '../add-team/select-org/select-org';
import {FilterSeachPage} from '../add-team/filter-search/filter-search';
import {TeamTabsPage} from './tabs/tabs'
import {ThisTeamPage} from './this-team/this-team'
import {FindTournamentPage} from '../tournament/find/find-tourn'
import {SelectGenderPage} from "../add-team/select-gender/select-gender";
import {AddMenuPage} from "../add-menu/add-menu";


@Component({
  templateUrl: 'build/pages/teams/teams.html'
})
export class TeamsPage {

  // Defining variable
  private tournamentView: string = 'ongoing';

  private soccerTeams: any = [
    {
      name: 'Girls U16 Seacoast United',
      coach: 'Lisa Connors',
      img: 'http://www.fetchlogos.com/wp-content/uploads/2015/11/Seacoast-United-Phantoms-Logo.gif',
      sport: 'soccer',
      foo: true
    },{
      name: 'Girls U14 Seacoast United',
      coach: 'Lisa Connors',
      img: 'http://www.fetchlogos.com/wp-content/uploads/2015/11/Seacoast-United-Phantoms-Logo.gif',
      sport: 'soccer',
      foo: true
    }
  ];

  private basketballTeams: any = [
    {
      name: 'Spartans Boys 12U',
      coach: 'Ryan Wilson',
      img: 'http://meltonbasketball.com.au/wp-content/uploads/2011/12/Spartans.jpg',
      sport: 'basketball',
      foo: false
    },
    {
      name: 'Warroiors Boys 15U',
      coach: 'Ryan Wilson',
      img: 'https://pbs.twimg.com/profile_images/415334320619130880/jz1mwqe_.jpeg',
      sport: 'basketball',
      foo: false
    },
  ];

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private asCtrl: ActionSheetController) {
  }


  goToSelectSportPage(){
    let settingsModal = this.modalCtrl.create(SelectGenderPage);
    settingsModal.present();
  }
  
  goToTournamentDetailsPage(){
    let detailsModal = this.modalCtrl.create(TournamentDetailsPage);
    detailsModal.present();
  }
  
  goToSettingsListPage(){
    let settingsModal = this.modalCtrl.create(SettingsListPage);
    settingsModal.present();
  }

  goToFilterSeachPage(){
    let filterModal = this.modalCtrl.create(FilterSeachPage);
    filterModal.present();
  }

  goToTeamTabsPage(){
    // let teamTabsModal = this.modalCtrl.create(TeamTabsPage);
    // teamTabsModal.present();
    this.navCtrl.push(TeamTabsPage);
  }

  goToThisTeamPage(){
    this.navCtrl.push(ThisTeamPage);
  }

  presentTeamActionSheet() {
    let actionSheet = this.asCtrl.create({
      // title: 'Seacost United Girls 12U',
      buttons: [
        {
          text: 'Find My Team',
          handler: () => {
              let filterModal = this.modalCtrl.create(SelectGenderPage);
              filterModal.present();
          }
        },{
          text: 'Find a Tournament',
          handler: () => {
              let findTournamentModal = this.modalCtrl.create(FindTournamentPage);
              findTournamentModal.present();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  goToMenuPage() {
    let selectTeamModal = this.modalCtrl.create(AddMenuPage);
    selectTeamModal.present();
  };

}
