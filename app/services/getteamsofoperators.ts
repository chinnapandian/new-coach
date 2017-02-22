import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class TeamsListService {

  private apiPath = '/api/CustodianTeam/GetTeamsbyEventOperator';

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
  }

  getTeamsList(orgid, userid, sports) {  
    var params = '?OrgId=' + orgid + '&UserId=' + userid + '&Sports=' + sports;
    console.log(this._config.getHttp() + this._config.getApiHost() + this.apiPath + params);
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

