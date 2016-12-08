import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class SettingsService {
  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
  }

  resetPassword(queryParam) {
    let body = JSON.stringify(queryParam);
    let apiPath = '/api/ResetPassword';
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + apiPath,
      body,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  saveProfile(queryParam) {
    let body = JSON.stringify(queryParam)
     let apiPath = '/api/User/UpdateUserProfile';
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + apiPath,
      body,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getProfile(queryParam) {
    let apiPath = '/api/User/GetUserByUserName?Username=';
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + apiPath + queryParam,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }
getUserPreference(queryParam) {
    let apiPath = '/api/UserPreference/GetUserPreferenceDetailsByUserId?UserId=';
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + apiPath + queryParam,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }
  saveUserPreference(queryParam) {
    let body = JSON.stringify(queryParam)
     let apiPath = '/api/UserPreference/AddUserPreferenceDetails';
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + apiPath,
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
