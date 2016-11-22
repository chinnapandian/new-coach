import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/add-team/select-pack/select-pack.html'
})
export class SelectPackPage {

    private tournament:any = [
        {
            name: 'Zero Gravity One Day Showcase',
            date: 'May 8 - 9, 2016',
            img: 'http://admin.tourneymachine.com/TournamentFiles/h201606081959263159a61ea9a0d2b48/e326e697caa6d92dc37d10362b42e0ef_article_image_2301185-640.png',
            price: 1.99
        },
    ];

    private bullet:string = '../../../../medal-check.svg';

    private bulletList:any = [
        'Full Team Schedules',
        'Divisional Brackets',
        'Pool Standings',
        'Score Updates',
        'Pool & Bracket Updates',
        'Schedule Change Notifications',
        'Scorekeeper Access',
    ];


    private packs:any = [
        {
            name: 'Personal Pass (Season)',
            info: '1 Parent Pass, 1 Player Pass',
            description: 'Get access for you and your player for the entire tournament season.',
            img: '../../../../personal-pack.svg',
            price: 2.99
        }, {
            name: 'Family Pass (Season)',
            info: '2 Parent Passes, 2 Player Passes',
            description: 'Get access for you and your player for the entire tournament season.',
            img: '../../../../family-pack.svg',
            price: 4.99
        }, {
            name: 'Team Pass (Season)',
            info: '15 Parent Passes, 15 Player Passes',
            description: 'Get access for you and your entire team',
            img: '../../../../team-pack.svg',
            price: 14.99
        },
    ];

    private season:any = [
        {
            name: 'Zero Gravity Battle of the Baskets',
            img: '../../../new-medal.svg',
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
            img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTAR3qx6-yKpW5k1DhLN07mU_athdfqnbe1b2riU5LXvmKiU7kX',
            date: 'November 15 - 17, 2016',
            price: .99
        }
    ];


    //      img: '../../../new-medal.svg',

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }


    // goToTournamentPage() {
    //   this.navCtrl.pop();
    //
    //   let tournamentModal = this.modalCtrl.create(TournamentPage);
    //   tournamentModal.present();
    //
    // };

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

