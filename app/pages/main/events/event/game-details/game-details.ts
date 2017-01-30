import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {LocationsListService} from "../../../../../services/getlocations";
import {LoginService} from "../../../../../services/login";
import {GetPlayerStatsService} from  '../../../../../services/getplayerstats';
import {Geolocation} from 'ionic-native';
declare var google;

@Component({
  templateUrl: 'build/pages/main/events/event/game-details/game-details.html',
    providers : [LocationsListService,GetPlayerStatsService]
})

export class GameDetailsPage {

  private matchup:any = [
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
    }
  ];
  private SelectedGame;
  private EventType;
  private facilitiesaddress=[];
  private facilityaddress;
  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private navParams : NavParams,
      private _locationsListService : LocationsListService,
      private _loginService : LoginService,
      private playerstatsService:GetPlayerStatsService) {

        this.SelectedGame = this.navParams.get("SelectedGame");
        this.EventType = this.navParams.get("EventType");
        console.log(this.SelectedGame);
        console.log(this.EventType);
      /* var UserId = this._loginService.getUserInfo().Context.User.UserId;
        this.playerstatsService.getPlayerStats(UserId,this.SelectedGame.TournamentId,0,0,this.SelectedGame.GameId)    
                    .subscribe(data => {
                      console.log(data);
                    })*/
         this._locationsListService.getLocationsList()
                    .subscribe(data => {
                        this.facilitiesaddress=data;
                        for(var j=0;j<this.facilitiesaddress.length;j++)
                          {
                                if(this.SelectedGame.LocationName.toLowerCase().trim() == this.facilitiesaddress[j].Name.toLowerCase().trim())
                                {
                                  var location = this.facilitiesaddress[j];
                                  this.facilityaddress = location.Address1 + ", " +       
                                                                  location.City + ", " + location.State + ", " +
                                                                  location.Zip + ", " + location.Country;
                                  this.loadMap();
                                   break;
                                }
                          }

                    });

  }

 getDate(dt: string) {
    return this.getFormattedDate(new Date(dt.substr(0, 19)));
  }

 getDay(dt) {
   var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   return (weekdays[new Date(dt).getDay()]);
  }

  getTime(dt: string) {
    return new Date(dt.substr(0, 19));
  }

 getFormattedDate(dt) {
       var date=new Date(dt);
       var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
       var months =['January','February','March','April','May','June','July','August','September','October','November','December'];
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return (months[date.getMonth()] + ' ' + day + ', '+ year);
  }

  convertToAmPm(dt){
          var ampm = (parseInt(dt.substr(0,2)) >= 12) ? "PM" : "AM";
          var hours;
          if (parseInt(dt.substr(0,2)) == 12)
            hours = 12;
          else if (parseInt(dt.substr(0,2)) > 12)
            hours =  parseInt(dt.substr(0,2))-12;
          else
            hours = parseInt(dt.substr(0,2));
          var min = dt.substr(2,3);
          return(hours + "" + min + " " + ampm);
   }
  goToRecordStatsPage(){
    
  }                                                      

  loadMap(){
   var address= this.facilityaddress;
    //convert address to latitude, longitude using GeoCoder
    var geocoder= new google.maps.Geocoder();
    var lat,lng;
    console.log(geocoder);
    geocoder.geocode({ 'address': address }, function (results, status) {
        console.log(results);
                        if (status == google.maps.GeocoderStatus.OK) {                         
                                lat = results[0].geometry.location.lat();
                                lng = results[0].geometry.location.lng();
                                var myCenter=new google.maps.LatLng(lat,lng);
                                //set map properties
                                  var mapProp = {
                                    center:myCenter,
                                    zoom:15,
                                    zoomControl:true,
                                    zoomControlOptions: {
                                      style:google.maps.ZoomControlStyle.SMALL
                                    },
                                    mapTypeId:google.maps.MapTypeId.ROADMAP
                                  };
                                  console.log(lat);
                                  console.log(lng);
                                  // TO DISPLAY THE MAP INSIDE THE DIV
                                  var mapp = new google.maps.Map(document.getElementById("map"), mapProp);  
                                    // add pushpin in the specific address
                                    let marker= new google.maps.Marker({
                                            map : mapp,
                                            animation : google.maps.Animation.DROP,
                                            position : new google.maps.LatLng(lat,lng)
                                          });
                                        // add Information Window on the pushpin
                                 /*   let content="<h6> " + address + " </h6>";
                                    let infoWindow = new google.maps.InfoWindow({
                                                content : content
                                          })
                                      infoWindow.open(mapp, marker);*/
                                                               }                         
                        });
  }
  
  showDirection(address){
    console.log(address);
    //convert address to latitude, longitude using GeoCoder
    var geocoder= new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {                         
                                var lat = results[0].geometry.location.lat();
                                var lng = results[0].geometry.location.lng();
                                var myCenter=new google.maps.LatLng(lat,lng);
                                //set map properties
                                  var mapProp = {
                                    center:myCenter,
                                    zoom:15,
                                    zoomControl:true,
                                    zoomControlOptions: {
                                      style:google.maps.ZoomControlStyle.SMALL
                                    },
                                    mapTypeId:google.maps.MapTypeId.ROADMAP
                                  };
                                  console.log(lat);
                                  console.log(lng);
                                
                                  if (navigator.geolocation) {
                                            navigator.geolocation.getCurrentPosition(
                                                function(details) {
                                                    // success!
                                                      var url= 'http://maps.google.com/maps?saddr='+lat+','+lng+'&daddr='+details.coords.latitude+','+details.coords.longitude+'&dirflg=d';
                                                                      console.log(url);
                                                                      window.open(url, '_system', 'location=yes');
                                                },
                                                function() {
                                                    // failed to get a GPS location before timeout!
                                                    var url = "http://www.google.com/maps/place/" + lat + "," + lng + "/@" + lat + "," + lng + ",12z/data=!3m1!4b1";
                                                    window.open(url, '_system', 'location=yes');
                                                }, {
                                                    enableHighAccuracy: false,
                                                    timeout: 5000,
                                                    maximumAge: 10000
                                                });
                                        } else {
                                          console.log("error");
                                          
                                        }
                                }                         
                        });
  }

  showHideRecordStats(){
    if(this.EventType=='completed'){
        return true;
    }else if(this.EventType=='ongoing'){
      
    }else{

    }
  }

  showHideViewStats(){
    console.log("adf");
   if(this.EventType=='completed'){
    
    }else if(this.EventType=='ongoing'){
      
    }else{
      
    } 
  }  

  dismiss() {
     localStorage.setItem("TabIndex",'1');
    this.viewCtrl.dismiss();
  }
}
