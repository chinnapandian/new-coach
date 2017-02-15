import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class LoginService {

  private apiPath;
  private userInfo=[];
  private loginData=[];
  private regUserTournaments=[];
  private regUserPlayers=[];
  private playerTeams=[];
  private custodianTeams=[];

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
    this.apiPath = '/api/authentication';
  }

  login(queryParam) {
    let body = JSON.stringify(queryParam)
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + this.apiPath,
      body,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getUserInfo()
  {
    return JSON.parse(localStorage.getItem("userInfo"))? JSON.parse(localStorage.getItem("userInfo")) : this.userInfo;
  }
  
  setUserInfo(userinfo)
  {
    this.userInfo=userinfo;
    localStorage.setItem("userInfo",JSON.stringify(this.userInfo));
  }
  
  getLoginData()
  {
     return JSON.parse(localStorage.getItem("loginData"))? JSON.parse(localStorage.getItem("loginData")) : this.loginData;
  }

  setLoginData(loginData)
  {
    this.loginData=loginData;
    localStorage.setItem("loginData",JSON.stringify(this.loginData));
  }

  setRegUserTournaments(setUsrTmnts)
  {
    this.regUserTournaments = setUsrTmnts;
    localStorage.setItem("regUserTournaments",JSON.stringify(this.regUserTournaments));
  }

  getRegUserTournaments()
  {
      return JSON.parse(localStorage.getItem("regUserTournaments"))? JSON.parse(localStorage.getItem("regUserTournaments")) : this.regUserTournaments;
  }
  
 setCustodianTeam(setCustTeams)
  {
  //  this.custodianTeams = setCustTeams;
    localStorage.setItem("CustodianTeams",JSON.stringify(setCustTeams));
  }

  getCustodianTeam()
  {
     return JSON.parse(localStorage.getItem("CustodianTeams"));
     // return JSON.parse(localStorage.getItem("CustodianTeams"))? JSON.parse(localStorage.getItem("CustodianTeams")) : this.custodianTeams;
  }

  setRegUserPlayers(setUsrPlyrs)
  {
  //  this.regUserPlayers = setUsrPlyrs;
     localStorage.setItem("regUserPlayers",JSON.stringify(setUsrPlyrs));
  }

  getRegUserPlayers()
  {
    return JSON.parse(localStorage.getItem("regUserPlayers"));
    // return JSON.parse(localStorage.getItem("regUserPlayers"))? JSON.parse(localStorage.getItem("regUserPlayers")) : this.regUserPlayers;
  }

  setPlayerTeams(setPlyrTeams)
  {
    this.playerTeams = setPlyrTeams;
    localStorage.setItem("playerTeams",JSON.stringify(this.playerTeams));
  }

  getPlayerTeams()
  {
     return JSON.parse(localStorage.getItem("playerTeams"))? JSON.parse(localStorage.getItem("playerTeams")) : this.playerTeams;
  }

   setFollowedTeams(followedteams)
  {
     localStorage.setItem("FollowedTeams",JSON.stringify(followedteams));
  }

  getTournamentSchedules()
  {
     return JSON.parse(localStorage.getItem("Schedules"));
  }
  getTournamentStandings()
  {
     return JSON.parse(localStorage.getItem("Standings"));
  }
  getTournamentBrackets()
  {
     return JSON.parse(localStorage.getItem("Brackets"));
  }
  setTournamentScheduleStandings(schedule,bracket,standing)
  {
     localStorage.setItem("Schedules",JSON.stringify(schedule));
     localStorage.setItem("Brackets",JSON.stringify(bracket));
     localStorage.setItem("Standings",JSON.stringify(standing));
  }

  getFollowedTeams()
  {
     return JSON.parse(localStorage.getItem("FollowedTeams"));
  }
  
  handleError(error) {
    console.error(JSON.stringify(error));
    return Observable.throw(error.json().error || 'Server error');
  }

}

