import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/selected-team/my-players/selected-player/full-stats/full-stats.html'
})

export class FullStatsPage {

    private statsView:string = 'total';
    private eventView: string = 'tournament';

    private statsHeadings: any = [
        'PTS',
        'FGM',
        'FGA',
        'FG%',
        '3PM',
        '3PA',
        '3P%',
        'FTM',
        'FTA',
        'FT%',
        'REB',
        'AST',
        'STL',
        'BLK',
        'TOV',
        'PF',
    ];

    private avgStats: any = [
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
    ];

    private totalStats: any = [
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
        (Math.floor(Math.random() * 10)),
    ];


    private myTournaments:any = [
        {
            name: 'Zero Gravity Battle of the Baskets',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            date: 'September 12 - 13, 2016',
            price: .99
        }, {
            name: 'Zero Gravity Fall Showdown',
            img: 'http://admin.tourneymachine.com/TournamentFiles/h201606081959263159a61ea9a0d2b48/e326e697caa6d92dc37d10362b42e0ef_article_image_2301185-640.png',
            date: 'September 28 - 29, 2016',
            price: .99
        }, {
            name: 'Zero Gravity King of the Coast',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h20140923064359771d8fd157e38db47/Indy.png',
            date: 'November 3 - 4, 2016',
            price: .99
        }, {
            name: 'Zero Gravity One Day Showcase',
            img: 'medal.svg',
            date: 'November 15 - 17, 2016',
            price: .99
        }
    ];
    
    private selectedTournament:any = [
        {
            name: 'Zero Gravity Battle of the Baskets',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            date: 'September 12 - 13, 2016',
        }
    ];

    private poolGames:any = [
        {
            team2: 'BGCN Pride 10',
            team2Coach: 'R. Pierce',
            team2Rec: '(3 - 0)',
            team1: 'Spartans Boys 12U',
            team1Coach: 'F. Underwood',
            team1Rec: '(3 - 1)',
            team1Score: '',
            team2Score: '',
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
            team1Score: '',
            team2Score: '',
            dateStamp: 'Sun 10/20',
            timeStamp: '5:30 PM',
            facility: 'Above The RIM Sports Complex',
            court: '3'
        }
    ];


    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
