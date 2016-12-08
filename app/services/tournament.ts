import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class TournamentDataService {

  private tournamentData;
  private apiPath1 = '/api/Game/GameResultAndStandingsByOrg';
  private apiPath2 = '/api/Tournament/GetTournamentInfo';

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
  }


  getTournamentScheduleStandings(orgid, userid, tournamentid, sports) {
     var queryParam = "?Game=ResultAndStandings" +
      "&OrgId=" + orgid +
      "&UserId=" + userid +
      "&TournamentId=" + tournamentid +
      "&Sports=" + sports;
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + this.apiPath1 + queryParam,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getTournamentInfo(tournId) {
    return this._http.get(this._config.getHttp() + this._config.getApiHost()  + this.apiPath2 + '?Result=info' + '&TournamentId=' + tournId + '&Sports=basketball',
                { headers: this._config.getDefaultHeaders() })
                .map(res => res.json())
                .catch(this.handleError);
  }

  getTournamentData() {
  return this.tournamentData; 
  }

  setTournamentData(data) {
  this.tournamentData = data; 
  }

  handleError(error) {
    console.error(JSON.stringify(error));
    return Observable.throw(error.json().error || 'Server error');
  }

}
