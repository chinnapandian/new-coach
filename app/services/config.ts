import {Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MyPlayerConfigService {
    //stage
    private defaultDeviceId = "6e88d6283b13d222";
    private defaultAuthToken = "FAA6A93CDF52AC2EA7B20FCE6C31B30576F109766B5AB3A385707B38AC01A15Adaaafa7f-f984-4571-b1cd-7af18daccafa";

    //local
   //private defaultDeviceId = "6e88d6283b13d223";
   //private defaultAuthToken = "7F55D369FFFBD49D69B7CCA77C46A503F458BF37AF545AA7588AA0193AD370D7a582d25b-6d2c-459f-962a-1981ef0444e3";
    
    private defaultDevice = "iOS";
    private defaultRegistrationId = "APA91bFZg8BXvVS3O6I5yNIGPs3OyV-0oVcUrH3Jv7WJHyrPYnjjxxV-oiHpnr33YntqyZrpb7A7QaVbbBy0TdH0NYzlIL2orCJsUFSwxkUcsVIp1Lczar7iPv82T9icRScHDQxQhxw3";
    
    private deviceId = localStorage.getItem("deviceId");
    private authToken = localStorage.getItem("AuthToken");
    private device = localStorage.getItem("device");
    private registrationId =localStorage.getItem("registrationId");

    private http = "https://";


    getHttp() {
        return this.http;
    }

    getApiHost() {
        return "stage.myludus.com";
    //  return "stage.myludus.com:8050";
    //  return "zerogravity.myludus.com";
      // return  "mygame.local";
    };

    getDevice() {
        return (this.device==undefined)||(this.device=='')||(this.device=='undefined')? this.defaultDevice : this.device;
    }

    getRegistrationId() {
        return (this.registrationId==undefined)||(this.registrationId=='')||(this.registrationId=='undefined') ? this.defaultRegistrationId : this.registrationId;
    }

    getDeviceId() {
        return (this.deviceId=='undefined')||(this.deviceId=='')||(this.deviceId==undefined) ? this.defaultDeviceId : this.deviceId;
    }

    setDeviceId(devId) {
        if(devId === 'undefined' || devId == ''|| devId==undefined)
            this.deviceId = this.defaultDeviceId;
        else 
             this.deviceId = devId;  
        localStorage.setItem("deviceId", this.deviceId);
    }
    
    getAuthToken() {
        return (this.authToken==undefined)||(this.authToken=='')||(this.authToken=='undefined')||(this.authToken=='null')||(this.authToken==null) ? '' : this.authToken;
    //    return this.authToken!=undefined? this.authToken : '';
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
        localStorage.setItem('AuthToken',this.authToken);
    }

    setRegistrationId(regId) {
        if(regId === 'undefined' || regId == ''|| regId==undefined)
            this.registrationId = this.defaultRegistrationId;
        else 
             this.registrationId = regId;  
        localStorage.setItem("registrationId", this.registrationId);
    }

    setDevice(dev) {
        this.device = dev;
        localStorage.setItem("device", this.device);
    }
    
    setUserNamePassword(username,password){
        localStorage.setItem('Email',username);
        localStorage.setItem('Password',password);        
    }

    setCurrDate(data){
         localStorage.setItem('currdate',data);
    }
    getCurrDate(){
        return localStorage.getItem('currdate');
      //  var today=this.addDays(currentDate,0).toJSON();
     //   console.log(today);
     //   return today;
    }

    addDays(theDate, days) {
            return new Date(theDate.getTime() + days*24*60*60*1000);
    }

    toUTCDate(date){
        var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return _utc;
    };

    getDefaultHeaders() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("AuthToken", this.getAuthToken());
        headers.append("DeviceId", this.getDeviceId());
        return headers;
    }
}
