import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class TelCarriersListService {

  private apiPath = '/api/Telcarriers/GetTelcarriers';

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
  }

  getTelCarriersList() {
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + this.apiPath,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(JSON.stringify(error));
    return Observable.throw(error.json().error || 'Server error');
  }
}

