import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {AvatarsListService} from  '../../../../../services/getavatars';
import {MyPlayerConfigService} from  '../../../../../services/config';

@Component({
  templateUrl: 'build/pages/main/home/add-player/add-avatar/add-avatar.html',
  providers : [AvatarsListService]
})
export class UpdatePlayerAvatarPage {

  private avatarGender: string = 'boys';
  private boyavatars = [];
  private girlavatars = [];
  private imagePath;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private avatars : AvatarsListService,
      private navParams : NavParams,
      private _config: MyPlayerConfigService) {

        this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/";

        this.avatars.getAvatarsList("boys")
        .subscribe(data =>{
            this.boyavatars = data;
        })
        this.avatars.getAvatarsList("girls")
        .subscribe(data =>{
            this.girlavatars = data;
        })

}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
