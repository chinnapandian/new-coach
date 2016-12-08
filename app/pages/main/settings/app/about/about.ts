import {Page, Modal, ViewController, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/main/settings/app/about/about.html'
})

export class AboutPage {

  constructor(private _viewController: ViewController,
              private _navController: NavController) {
  }

  close() {
    this._viewController.dismiss();
  }
} // end class
