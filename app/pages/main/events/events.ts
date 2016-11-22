import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';
import {PurchaseEventPage} from './purchase/event/purchase-event'
import {SelectedEventTabs} from "./event/tabs/event-tabs";


@Component({
    templateUrl: 'build/pages/main/events/events.html'
})

export class EventsPage {

    private scheduleView: string = "tournament";

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
            img: '../../../medal-shadow.png',
            date: 'November 15 - 17, 2016',
            price: .99
        }
    ];
    
    private myLeagues:any = {
        ZG: [
            {
                name: 'Zero Gravity Fall League - NE',
                img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
                date: 'September 12 - 13, 2016',
            }
        ],
        HG: [
            {
                name: 'Zero Gravity Fall League - NE',
                img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRl6_ZmTB4hxELC_wb0wfOLlu0r0JnqrUw0TCZL_2zC2l4UCRmDyQ',
                date: 'September 12 - 13, 2016',
            },{
                name: 'Zero Gravity Fall League - NE',
                img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTz880sU3ARL_A0W1ELNI0pf3riKE24NPzDWYdhpyPKuQ0nRnO8',
                date: 'September 12 - 13, 2016',
            }
        ]
    };

    private allSeasons:any = [
        {
            HoopGroup: [
                {
                    name: 'Zero Gravity Battle of the Baskets',
                    img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
                    price: .99
                }
            ],
            StarGroup: [
                {
                    name: 'Zero Gravity Battle of the Baskets',
                    img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
                    price: .99
                }
            ],
        }
    ];

    private allTournaments:any = [
        {
            name: 'Zero Gravity Battle of the Baskets',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            price: .99
        }, {
            name: 'Zero Gravity Fall Showdown',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            price: .99
        }, {
            name: 'Zero Gravity King of the Coast',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            price: .99
        }, {
            name: 'Zero Gravity Rumble at The RIM',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            price: .99
        }, {
            name: 'Zero Gravity Fall Brawl',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            price: .99
        }, {
            name: 'Zero Gravity Live at The House',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            price: .99
        }, {
            name: 'Zero Gravity Beast of The East',
            img: 'http://admin.tourneymachine.com/Public/CustomerFiles/h201310220800267707a0d3c45337b49/ZG%20Desktop%20Logo.png',
            price: .99
        }
    ];

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private modalCtrl:ModalController) {
    }

    // goToMessageBoardPage(){
    //   this.navCtrl.push(MessageBoardPage);
    // }

    goToPurchaseEventPage() {
        let purchaseEventModal = this.modalCtrl.create(PurchaseEventPage);
        purchaseEventModal.present();
    }
    
    goToSelectedEventPage() {
        // this.navCtrl.push(SelectedEventPage);
        let y = this.modalCtrl.create(SelectedEventTabs);
        y.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}