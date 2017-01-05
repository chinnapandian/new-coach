import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {MyPlayerConfigService} from './config';

@Injectable()
export class MessageBoardService {

  private apiPathAddMsg;
  private apiPathReplyMsg;
  private apiPathGetMsgList;
  private userInfo;

  constructor(private _http: Http,
    private _config: MyPlayerConfigService) {
    this._http = _http;
    this.apiPathAddMsg = '/api/MessageBoard/AddMessageBoard?Sports=basketball';
    this.apiPathReplyMsg = '/api/MessageBoard/ReplyMessageBoard?Sports=basketball';
    this.apiPathGetMsgList = '/api/MessageBoard/getMessageBoardDetails?Sports=basketball';
  }

  addMessage(queryParam) {

    let body = JSON.stringify(queryParam)
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + this.apiPathAddMsg,
      body,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getMessageList(userid) {
    return this._http.get(this._config.getHttp() + this._config.getApiHost() + this.apiPathGetMsgList  +'&UserId=' + userid,
      { headers: this._config.getDefaultHeaders() })
      .map(res => res.json())
      .catch(this.handleError);
  }

 replyMessage(queryParam) {

    let body = JSON.stringify(queryParam)
    return this._http.post(this._config.getHttp() + this._config.getApiHost() + this.apiPathReplyMsg,
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

