import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {SelectedStatEventPage} from "./selected-stat-event/selected-stat-event"

@Component({
    templateUrl: 'build/pages/selected-team/my-players/selected-player/stat-events/stat-events.html'
})

export class StatEventsPage {

    private statsView:string = 'average';

    private timeView:string = 'ongoing';

    private eventView: string = 'tournament';

    private statsHeadings: any = [
        'PTS',
        'REB',
        'AST',
        'STL',
        'TO',
        'BLK',
    ];
    
    private quickStatsHeadings: any = [
        'PPG',
        'FG%',
        '3P%',
        'FT%',
        'RPG',
        'APG',
    ];

    private statCard: any = [
        {
            header: 'PPG',
            value: '12.3'
        },{
            header: 'RPG',
            value: '5.3'
        },{
            header: 'APG',
            value: '2.9'
        },{
            header: 'FG%',
            value: '34.6%'
        },{
            header: '3P%',
            value: '10.3%'
        },{
            header: 'FT%',
            value: '72.1%'
        }
    ];

    private quickStatsData: any = [
        (Math.floor(Math.random() * 300) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 10) / 10),
    ];
    
    private statsData: any = [
        (Math.floor(Math.random() * 300) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 100) / 10),
        (Math.floor(Math.random() * 10) / 10),
    ];

    private x: any =
    {
        points: [
            'Points'
        ],
        FG: [
            'Field Goals Made',
            'Field Goals Attempted',
            'Field Goal Percent'
        ],
        PT2: [
            '2 Point Field Goals Made',
            '2 Point Field Goals Attempted',
            '2 Point Field Goal Percentage'
        ],
        PT3: [
            '3 Point Field Goals Made',
            '3 Point Field Goals Attempted',
            '3 Point Field Goal Percentage'
        ],
        FT: [
            'Free Throws Made',
            'Free Throws Attempted',
            'Free Throws Percentage'
        ],
        RB: [
            'Offensive Rebounds',
            'Defensive Rebounds',
            'Total Rebounds'
        ],
        BC: [
            'Assists',
            'Steals',
            'Turnovers',
            'Blocks'
        ],
        Fouls: [
            'Total Fouls'
        ]
    };


    // private playerStats: any = [
    //     {
    //         title: 'Points',
    //         total: (Math.floor(Math.random() * 10)),
    //         average: (Math.floor(Math.random() * 10)),
    //     },{
    //         title: 'Field Goals',
    //         total: (Math.floor(Math.random() * 10)),
    //         average: (Math.floor(Math.random() * 10)),
    //     },{
    //         title: 'Field Goal',
    //         total: (Math.floor(Math.random() * 10)),
    //         average: (Math.floor(Math.random() * 10)),
    //     },
    //     ];

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
            img: 'medal-shadow.png',
            date: 'November 15 - 17, 2016',
            price: .99
        }
    ];



    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }

    goToSelectedStatEventPage(){
      this.navCtrl.push(SelectedStatEventPage);
    }
    
    // goToFullStatsPage(){
    //   this.navCtrl.push(FullPlayerStatsPage);
    // }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
