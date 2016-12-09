import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {AvatarsListService} from  '../../../../../services/getavatars';
import {MyPlayerConfigService} from  '../../../../../services/config';
import {UpdatePlayerPage} from "../../update-player/update-player";
import {TitlePipe} from  '../../../../../pipes/title';

@Component({
  templateUrl: 'build/pages/main/home/add-player/add-avatar/add-avatar.html',
  providers : [AvatarsListService],
  pipes : [TitlePipe]
})
export class UpdatePlayerAvatarPage {

  private avatarGender: string = 'boys';
  private boyavatars = [];
  private girlavatars = [];
  private boysImagePath;
  private girlsImagePath;
  private selectedavatar;
  private tabview = 'boys';

 constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private avatars : AvatarsListService,
      private navParams : NavParams,
      private _config: MyPlayerConfigService) {

        this.boysImagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/boys/";
        this.girlsImagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/girls/";

        this.avatars.getAvatarsList("boys")
        .subscribe(data =>{
            this.boyavatars = data;
            this.setDefault('boys');
        })
        this.avatars.getAvatarsList("girls")
        .subscribe(data =>{
            this.girlavatars = data;
        })      
}

 setDefault(name){
  this.tabview = name;
  if(this.tabview == 'boys')
     this.selectedavatar = this.boyavatars[0];
  else
     this.selectedavatar = this.girlavatars[0];
  console.log(this.selectedavatar);
 }

  dismiss() {
   this.selectedavatar = this.selectedavatar.toString();
  //  var avatarname = this.selectedavatar.substring(0,this.selectedavatar.indexOf('.'));
  //  this.avatarname = avatarname.substring(0,1).toUpperCase() + avatarname.slice(1).toLowerCase();;
    console.log(this.selectedavatar);
    this.viewCtrl.dismiss(this.selectedavatar);
  }
}
