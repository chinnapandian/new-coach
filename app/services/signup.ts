import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class SignupService {
  
  private apiPath = '/api/FreeUserRegistration/FreeUserLogin';
  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
   
  }


  signUp(queryParam) {
    var headersData = new Headers();
    headersData.append('Content-Type', 'application/json');
    let body = JSON.stringify(queryParam)
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + this.apiPath,
      body,
      { headers: headersData })
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(JSON.stringify(error));
    return Observable.throw(error.json().error || 'Server error');
  }


}

