import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, PopoverController} from 'ionic-angular';
import {BracketsDivisionFilterPage} from './division-filter/division-filter'

@Component({
    templateUrl: 'build/pages/main/events/event/event-brackets/brackets.html'
})

export class EventBracketsPage {

    public bracketGames:any =
        {
            round1: [
                {
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                },{
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                },{
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                },{
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                }
            ],
            round2: [
                {
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver ',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                },{
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                }
            ],
            round3: [
                {
                    team2: 'C4 - Blue',
                    team2Coach: 'J. Danny',
                    team2Rec: '(0 - 2)',
                    team1: 'TBD',
                    team1Coach: 'Winner of American Silver I',
                    team1Rec: '',
                    team1Score: '',
                    team2Score: '',
                    dateStamp: 'SUN',
                    timeStamp: '5:30 PM',
                    facility: 'Above The RIM Sports Complex',
                    court: '3'
                }
            ]
        }
    ;

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private popoverCtrl:PopoverController,
                private modalCtrl:ModalController) {
    }


    goToBracketsDivisionFilterPage() {
        let selectDivisionModal = this.modalCtrl.create(BracketsDivisionFilterPage);
        selectDivisionModal.present();
    };

    presentPopover(event) {
        let popover = this.popoverCtrl.create(BracketsDivisionFilterPage);
        popover.present({
            ev: event
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
