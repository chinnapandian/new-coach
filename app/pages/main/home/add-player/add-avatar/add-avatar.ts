import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {AvatarsListService} from  '../../../../../services/getavatars';
import {MyPlayerConfigService} from  '../../../../../services/config';
import {AddPlayerPage} from "../../add-player/add-player";
import {TitlePipe} from  '../../../../../pipes/title';
import {LoginService} from  '../../../../../services/login';

@Component({
  templateUrl: 'build/pages/main/home/add-player/add-avatar/add-avatar.html',
  providers : [AvatarsListService],
  pipes : [TitlePipe]
})
export class AddPlayerAvatarPage {

  private avatarGender: string;
  private avatarfiles =[];
  private boyavatars = [];
  private girlavatars = [];
  private imagePath;
  private selectedavatar;
  private tabview = 'boys';
  private teamGender;

  constructor(
      private navCtrl: NavController,
      private viewCtrl: ViewController,
      private modalCtrl: ModalController,
      private avatars : AvatarsListService,
      private navParams : NavParams,
      private _config: MyPlayerConfigService,
      private _loginService:LoginService) {


        var followedTeams = this._loginService.getFollowedTeams();
        followedTeams.forEach(team => {
          if(team.TeamId == parseInt(this.navParams.get("SelectedTeamId")))
          {
              this.teamGender = team.Gender;
              this.avatarGender = (this.teamGender=='M')?'boys':'girls';
              this.selectedavatar = (this.navParams.get("SelectedAvatar")!="")?this.navParams.get("SelectedAvatar"):
                                    ((this.teamGender=='M')?"boys/joe.svg":"girls/caroline.svg");

          }
            
        });
        console.log(this.teamGender);
        this.imagePath = this._config.getHttp() + this._config.getApiHost() + "/assets/images/Avathar/";
        console.log(this.imagePath);

        this.avatars.getAvatarsList()
        .subscribe(data =>{
            this.avatarfiles = data;
            console.log(this.avatarfiles);
            this.avatarfiles.forEach(avatarfile => {
              if(avatarfile.toString().indexOf("boys")!=-1){
                 this.boyavatars.push(avatarfile);
              }
              else{
                 this.girlavatars.push(avatarfile);
              }
            });
            console.log(this.boyavatars);
            console.log(this.girlavatars);
            
        })
       
}

  dismiss() {
    console.log(this.selectedavatar);
    this.selectedavatar = this.selectedavatar.toString();
    this.viewCtrl.dismiss(this.selectedavatar);
  }
}
