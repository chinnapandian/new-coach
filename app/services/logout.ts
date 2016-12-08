import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class LogoutService {

  private apiPath;

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this.apiPath = '/api/product/UpdateMobileAppDeviceStatus';
  }

  logout() {
    console.log(this._config.getRegistrationId());
    let queryParam = 
      '?AppStatus=update&' +
      'RegisterationId=' + this._config.getRegistrationId();

    let body = JSON.stringify(queryParam)
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + this.apiPath + queryParam,
      '',
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(JSON.stringify(error));
    return Observable.throw(error.json().error || 'Server error');
  }


}

