import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, NavParams } from 'ionic-angular';
import { LocationsListService } from "../../../../../services/getlocations";
import { LoginService } from "../../../../../services/login";
import { Geolocation } from 'ionic-native';
import {MainTabs} from '../../../../main/tabs/main-tabs';
declare var google;

@Component({
    templateUrl: 'build/pages/main/events/event/event-info/event-info.html',
    providers: [LocationsListService]
})

export class EventInfoPage {

    private SelectedTournamentName;
    private SelectedTournamentId;
    private tourngames = [];
    private selectedTournGames = [];
    private facilities: any = [];
    private facilitiesaddress = [];
    private uniqueLocations = [];
    private dataLoading = true;

    constructor(private navCtrl: NavController,
        private viewCtrl: ViewController,
        private modalCtrl: ModalController,
        private navParams: NavParams,
        private _locationsListService: LocationsListService,
        private _loginService: LoginService) {

        this.SelectedTournamentId = localStorage.getItem("SelectedTournamentId");
        this.SelectedTournamentName = localStorage.getItem("SelectedTournamentName");
        this.tourngames = this._loginService.getTournamentSchedules();
        if(this.tourngames!=null){
            for (var i = 0; i < this.tourngames.length; i++) {
                if (this.tourngames[i].TournamentId == this.SelectedTournamentId)
                    this.selectedTournGames.push(this.tourngames[i]);
            }
        }

        console.log(this.selectedTournGames);
        this.uniqueLocations = this.removeDuplicates(this.selectedTournGames, "LocationName");
        console.log(this.uniqueLocations);

        this._locationsListService.getLocationsList()
            .subscribe(data => {
                this.facilitiesaddress = data;
                console.log(this.facilitiesaddress);
                for (var i = 0; i < this.uniqueLocations.length; i++) {
                    for (var j = 0; j < this.facilitiesaddress.length; j++) {
                        if (this.uniqueLocations[i].LocationId == this.facilitiesaddress[j].LocationId)
                        //   if(this.uniqueLocations[i].LocationName.toLowerCase().trim() == this.facilitiesaddress[j].Name.toLowerCase().trim())
                        {
                            var location = this.facilitiesaddress[j];
                            this.facilities.push({
                                LocationName: location.Name,
                                Address1: location.Address1,
                                Address2: location.Address2,
                                City: location.City,
                                State: location.State,
                                Zip: location.Zip,
                                Country: location.Country,
                                Address: location.Address1 + ", " +
                                location.City + ", " + location.State + ", " +
                                location.Zip + ", " + location.Country
                            })
                            break;
                        }
                    }
                }
                console.log(this.facilities);
                this.dataLoading = false;
            });
    }

    removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    loadMap(address) {
        console.log(address);
        //convert address to latitude, longitude using GeoCoder
        var geocoder = new google.maps.Geocoder();

        console.log(geocoder);
        geocoder.geocode({ 'address': address }, function (results, status) {
            console.log(results);
            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                console.log(lat, lng);
                var myCenter = new google.maps.LatLng(lat, lng);
                //set map properties
                var mapProp = {
                    center: myCenter,
                    zoom: 15,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    },
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                console.log(lat);
                console.log(lng);

                var url;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function (details) {
                            // success!
                            url = 'http://maps.google.com/maps?saddr=' + lat + ',' + lng + '&daddr=' + details.coords.latitude + ',' + details.coords.longitude + '&dirflg=d';
                            console.log(url);
                            window.open(url, '_system', 'location=yes');
                        },
                        function () {
                            // failed to get a GPS location before timeout!
                            url = "http://www.google.com/maps/place/" + lat + "," + lng + "/@" + lat + "," + lng + ",12z/data=!3m1!4b1";
                            window.open(url, '_system', 'location=yes');
                        }, {
                            enableHighAccuracy: false,
                            timeout: 5000,
                            maximumAge: 10000
                        });
                    console.log(url);
                } else {
                    url = "http://www.google.com/maps/place/" + lat + "," + lng + "/@" + lat + "," + lng + ",12z/data=!3m1!4b1";
                    window.open(url, '_system', 'location=yes');
                }
            }
        });
    }

    dismiss() {
        localStorage.setItem("TabIndex","1");
         if(localStorage.getItem("FromEventsTab")=="true"){
              this.viewCtrl.dismiss();
         }else{        
               this.viewCtrl.dismiss();
                this.navCtrl.push(MainTabs);
         }
         localStorage.setItem("FromEventsTab","false");  
    }


}
