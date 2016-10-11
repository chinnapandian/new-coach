import {Component} from '@angular/core';
import {ViewController, ModalController, ActionSheetController} from 'ionic-angular';
// import {SelectTeamPage} from './select-team/select-team';
import {GamePage} from './game/game';
import {TournamentDetailsPage} from './details/details';
import {SelectTeamPage} from './select-team/select-team';
import {scorekeeperPage} from '../scorekeeper/scorekeeper';

@Component({
    templateUrl: 'build/pages/tournament/tournament.html'
})

export class TournamentPage {

    private tournamentView:string = 'schedule';

    private poolGames:any = [
        {
            team2: 'Mass Elite - Red',
            team2Coach: 'M. Wilks',
            team2Rec: '(2 - 2)',
            team1: 'Spartans Boys 12U',
            team1Coach: 'T. Filborbn',
            team1Rec: '(3 - 1)',
            team1Score: '67',
            team2Score: '61',
            dateStamp: 'Final',
            timeStamp: '',
            facility: 'Nashua Sports Academy',
            court: '1'
        }, {
            team2: 'BGCN Pride 10',
            team2Coach: 'R. Pierce',
            team2Rec: '(3 - 0)',
            team1: 'Spartans Boys 12U',
            team1Coach: 'F. Underwood',
            team1Rec: '(3 - 1)',
            team1Score: '104',
            team2Score: '99',
            dateStamp: 'Sun 10/20',
            timeStamp: '12:30 PM',
            facility: 'Madison Square Garden',
            court: '5'
        }, {
            team2: 'C4 - Blue',
            team2Coach: 'J. Danny',
            team2Rec: '(0 - 2)',
            team1: 'Spartans Boys 12U',
            team1Coach: 'F. Coates',
            team1Rec: '(3 - 1)',
            team1Score: '44',
            team2Score: '17',
            dateStamp: 'Sun 10/20',
            timeStamp: '5:30 PM',
            facility: 'Above The RIM Sports Complex',
            court: '3'
        }
    ];

    private bracketGames:any = [
        {
            team2: 'C4 - Blue',
            team2Coach: 'J. Danny',
            team2Rec: '(0 - 2)',
            team1: 'Winner of American Silver I',
            team1Coach: '',
            team1Rec: '',
            team1Score: '44',
            team2Score: '17',
            dateStamp: 'Sununday 10/20',
            timeStamp: '5:30 PM',
            facility: 'Above The RIM Sports Complex',
            court: '3'
        }, {
            team2: 'Winner of Game 12',
            team2Coach: 'Johnny Danny',
            team1: 'Winner of American Silver II',
            team1Coach: 'Frank Underwood',
            team1Score: '0',
            team2Score: '0',
            dateStamp: 'Sun 10/20',
            timeStamp: '6:00 PM',
            facility: 'RIM',
            court: '5'
        }
    ];


    constructor(private viewCtrl:ViewController,
                private modalCtrl:ModalController,
                private actionCtrl: ActionSheetController){
    }

// goToSelectTeamPage() {
//   let selectTeamModal = this.modalCtrl.create(SelectTeamPage);
//   selectTeamModal.present();
// };

    presentGameActionSheet(){
        let actionSheet = this.actionCtrl.create({
            // title: 'Seacost United Girls 12U',
            buttons: [
                {
                    text: 'Get Directions',
                    handler: () => {
                        let filterModal = this.modalCtrl.create(GamePage);
                        filterModal.present();
                    }
                },{
                    text: 'Record Stats',
                    handler: () => {
                        let scorekeeperModal = this.modalCtrl.create(scorekeeperPage);
                        scorekeeperModal.present();
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
    };


    goToGamePage() {
        let gameModal = this.modalCtrl.create(GamePage);
        gameModal.present();
    };

    goToDetailsPage() {
        let detailsModal = this.modalCtrl.create(TournamentDetailsPage);
        detailsModal.present();
    };
    
    goToSelectTeamPage() {
        let selectTeamModal = this.modalCtrl.create(SelectTeamPage);
        selectTeamModal.present();
    };

    // goToScorekeeperPage() {
    //     let scorekeeperModal = this.modalCtrl.create(scorekeeperPage);
    //     scorekeeperModal.present();
    // };

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
