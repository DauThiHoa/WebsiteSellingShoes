import {ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators} from '@angular/forms';
// import './../../../assets/js/smtp.js';
import './../../../src/assets/smtp';
import {ProfileService} from "../services/profile.service";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {HttpService} from "../Shared/http.service";
import {GoogleSigninService} from "../google-signin.service";
import emailjs, {EmailJSResponseStatus} from "@emailjs/browser"; //file path may change →
declare let Email: any;

@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  title: 'google-signin';
  submited : boolean = false ;

  // user : gapi.auth2.GoogleUser;
  password_User : string;

  FromLogin = new FormGroup({
    email : new FormControl(""),
    password : new FormControl(""),
  });

  Login = new FormGroup({
    id : new FormControl(""),
    name : new FormControl(""),
    email : new FormControl(""),
    password : new FormControl(""),
  });
  FromProfile = new FormGroup({
    id: new FormControl(""),
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    phoneNo : new FormControl(""),
    message : new FormControl(""),
    selectCountry: new FormControl(""),
  });

  // SEND MAIL
  image =
    "https://images.freeimages.com/images/large-previews/7bc/bald-eagle-1-1400106.jpg";
  // name1;
  // age;
  loading = false;
  buttionText = "Submit";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(private  prodSrv : LoginService ,
              private  profileSrv : ProfileService ,
              private  route: Router,
              public http: HttpService,
              private element: ElementRef,
              private signInService : GoogleSigninService,
              private ref : ChangeDetectorRef) {

    // console.log('ElementRef: ', this.element);
    // gapi.load('auth2', function () {
    // gapi.auth2.init()
    // });
  }

  ngOnInit(): void {
    //  SEND MAIL
    //   console.log(this.http.test);

    // this.signInService.observable().subscribe(user => {
    //   this.user = user;
    //   this.ref.detectChanges();
    // })
     this.password_User = this.generateString();
  }

  // signIn (){
  //   this.signInService.signIn()
  // }
  // signOut (){
  //   this.signInService.signOut()
  // }

  onChangePassword () {
    if ( this.FromLogin.invalid){
      if (confirm("Please fill in all the information")) {
        this.route.navigate(['/forgetPassword']);
      }
      return;
    }else {
      this.password_User = this.generateString();

      this.prodSrv.getlogin().subscribe(data =>{
        for (const datum of data) {
          if(datum.email == this.FromLogin.controls.email.value){
            this.Login = new FormGroup({
              id : new FormControl(datum.id),
              name : new FormControl(datum.name),
              email : new FormControl(datum.email),
              password : new FormControl( this.password_User),
            });

            this.prodSrv.update(datum.id, this.Login.value).subscribe(data => {
               });
            }
        }
      });

      this.profileSrv.getProfile().subscribe(data =>{
        for (const datum of data) {
          if (datum.email == this.FromLogin.controls.email.value) {
            this.FromProfile = new FormGroup({
              id: new FormControl(datum.id),
              name: new FormControl(datum.name),
              email: new FormControl(datum.email),
              password: new FormControl(this.password_User),
              phoneNo: new FormControl(datum.phoneNo),
              message: new FormControl(datum.message),
              selectCountry: new FormControl(datum.selectCountry),
            });

            this.profileSrv.update(datum.id, this.FromProfile.value).subscribe(data => {
            });
          }
        }
      });
    }
  }

  onSubmit() {

    if ( this.FromLogin.invalid){
      if (confirm("Please fill in all the information")) {
        this.route.navigate(['/forgetPassword']);
      }
      return;
    }else {
      this.prodSrv.getlogin().subscribe(data =>{
        for (const datum of data) {
          if(datum.email == this.FromLogin.controls.email.value){
            this.password_User = datum.password;
            // alert("1 : " + datum.password);
            // alert("password_User : " + this.FromLogin.controls.message.value);

          }
        }
      });
    }
  }

  public onForgetPassword(e: Event) {

    // alert("HEHE : "+ this.FromLogin.controls.email.value);

    if ( this.FromLogin.invalid){
      if (confirm("Please fill in all the information")) {
        this.route.navigate(['/forgetPassword']);
      }
      return;
    }else {
            e.preventDefault();
            //service_7l0ixxe
            emailjs.sendForm('service_ql1in7p', 'template_ct39s0s', e.target as HTMLFormElement, 'QZDVBAB8rJEvzpViA')
              // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_PUBLIC_KEY')
              .then((result: EmailJSResponseStatus) => {
                console.log(result.text);
                if (confirm("Password has been sent to your email, please check your email")) {
                  location.replace("/changePassword");
                }
              }, (error) => {
                console.log(error.text);
                location.replace("/forgetPassword");
              });
          }
  }

  changeImage() {
    this.http.test = "changed";
    this.image =
      "https://images.pexels.com/photos/635529/pexels-photo-635529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
  }

  register() {

    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      // name: this.nameFormControl.value,
      // email: this.emailFormControl.value
      name: this.FromLogin.controls.password.value,
      email: this.FromLogin.controls.email.value
    }

  }
  generateString () {
    // program to generate random strings
    // declare all characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // function generateString(length) (
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
