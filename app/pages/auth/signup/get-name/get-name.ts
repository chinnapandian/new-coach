import {Component} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, ViewController} from 'ionic-angular';
import {GetEmailPage} from "../get-email/get-email";

@Component({
  templateUrl: 'build/pages/auth/signup/get-name/get-name.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class GetNamePage {
  
  getNameForm: FormGroup;
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder) {
     
    this.getNameForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    });
  
  }

  goToGetEmailPage(){
    console.log("entered");
    this.navCtrl.push(GetEmailPage,
    {
       FirstName : this.getNameForm.controls['firstName'].value,
       LastName : this.getNameForm.controls['lastName'].value
    });
  }
}
