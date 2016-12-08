import {Page, Modal, ViewController, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/main/settings/app/faq/faq.html'
})

export class FAQPage {

  constructor(private _viewController: ViewController,
              private _navController: NavController) {
  }

  dismiss() {
    this._viewController.dismiss();
  }
} // end class
