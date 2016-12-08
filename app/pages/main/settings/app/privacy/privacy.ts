import {Page, Modal, ViewController, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/main/settings/app/privacy/privacy.html'
})

export class PrivacyPage {

  constructor(private _viewController: ViewController,
              private _navController: NavController) {
  }

  dismiss() {
    this._viewController.dismiss();
  }
} // end class
