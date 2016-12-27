import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class GetPlayerStatsService {

  private apiPath = '/api/PlayerStats/getPlayerStatsbyTournamentId';
  private apiPath1 = '/api/PlayerStats/GetPlayerStatsInputHistory';
  private apiPath2 = '/api/PlayerStats/GetPlayerStatsbyId'

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
  }

  getPlayerStats(userid, tournid, playeruserid, teamid) {  
    var params = '?userId=' + userid + '&TournamentId=' + tournid + '&PlayerUserId=' + playeruserid + '&TeamId=' + teamid+ '&sports=basketball'; 
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + this.apiPath + params,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

getPlayerStatsById(playerstatsid) {  
    var params = '?Id=' + playerstatsid + '&sports=basketball'; 
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + this.apiPath2 + params,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

getPlayerStatsHistory(playerid, gameid, tournid) {  
    var params = '?PlayerUserId=' + playerid + '&GameId=' + gameid + '&TournamentId=' + tournid+ '&sports=basketball'; 
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + this.apiPath1 + params,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }
  handleError(error) {
    console.error(JSON.stringify(error));
    return Observable.throw(error.json().error || 'Server error');
  }
}

