import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectDivisionPage} from '../select-division/select-division'

@Component({
    templateUrl: 'build/pages/tournament/brackets/brackets.html'
})

export class BracketsPage {

    public bracketGames:any =
        {
            round1: [
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
                },{
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
                },{
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
                },{
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
                }
            ],
            round2: [
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
                },{
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
                }
            ],
            round3: [
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
                }
            ]
        }
    ;

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }


    goToSelectDivisionPage() {
        let selectDivisionModal = this.modalCtrl.create(SelectDivisionPage);
        selectDivisionModal.present();
    };

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
