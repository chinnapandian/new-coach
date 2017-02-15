import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class TournamentsListService {

  private apiPath = '/api/User/GetRegUserFollowupTournaments';

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
  }

  getTournamentsList(userid,userrole) {
    var params = '?userId=' + userid + '&Userrole=' + userrole;
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + this.apiPath + params,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(JSON.stringify(error));
    return Observable.throw(error.json().error || 'Server error');
  }
}

