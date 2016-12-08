import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class SavePlayerService {

  private apiPath;
  private userInfo;

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
    this.apiPath = '/api/CustodianPlayer/UpdateCustodianplayerdetails';
  }

  savePlayer(queryParam) {

    let body = JSON.stringify(queryParam)
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + this.apiPath,
      body,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(JSON.stringify(error));
    return Observable.throw(error.json().error || 'Server error');
  }


}

