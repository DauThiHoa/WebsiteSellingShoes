import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {HttpService} from "../Shared/http.service";

import {GoogleSigninService} from "../google-signin.service";
import { ElementRef, AfterViewInit} from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

  title = 'Codingvila Login With Google' ;
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  imgGoogle : string ;

  // title: 'google-signin';
  submited : boolean = false ;

  FromLogin = new FormGroup({
    email : new FormControl(""),
    password : new FormControl(""),
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

  }

  ngOnInit(): void {
    this.googleAuthSDK();
  }

  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        // Đăng nhập tài khoản GOOGLE :))))
        // => Thiết lập tài khoản đăng nhập
        this.onLoginGoogle (profile.getEmail());

        this.imgGoogle = profile.getImageUrl;
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '475421461262-lssg7cvgfreuue3tk1ptqf2j7f9nbk88.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }


  onSubmit() {

  }

  public onLoginGoogle (email : string): void {
    this.submited = true ;
    // if ( this.FromLogin.invalid){
    //   if (confirm("Please fill in all the information")) {
    //     this.route.navigate(['/login']);
    //   }
    //   return;
    // }else {
      this.prodSrv.getlogin().subscribe(data =>{
        for (const datum of data) {
          if(datum.email == email ){
            // this.route.navigate(['/home']);
            this.prodSrv.update(0, datum).subscribe(data => { });
            this.profileSrv.update(1, datum).subscribe(data => { });

            location.replace("/home");
            return;
            // location.reload();
          }
        }
        if (confirm("Email or password error")) {
          this.route.navigate(['/login']);
        }
      });
    // }
  }

  public onLogin(): void {
    this.submited = true ;
    if ( this.FromLogin.invalid){
      if (confirm("Please fill in all the information")) {
        this.route.navigate(['/login']);
      }
      return;
    }else {
      this.prodSrv.getlogin().subscribe(data =>{
        for (const datum of data) {
          if(datum.email == this.FromLogin.controls.email.value && datum.password == this.FromLogin.controls.password.value){
            // this.route.navigate(['/home']);
            this.prodSrv.update(0, datum).subscribe(data => { });
            this.profileSrv.update(1, datum).subscribe(data => { });

            location.replace("/home");
            return;
            // location.reload();
          }
        }
        if (confirm("Email or password error")) {
          this.route.navigate(['/login']);
        }
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
    // this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
    //   data => {
    //     let res:any = data;
    //     console.log(
    //       `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
    //     );
    //   },
    //   err => {
    //     console.log(err);
    //     this.loading = false;
    //     this.buttionText = "Submit";
    //   },() => {
    //     this.loading = false;
    //     this.buttionText = "Submit";
    //   }
    // );
    // let mailTransporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth:{
    //     user: "daudiep2003@gmail.com",
    //     pass: "kxiunzutpxcvbbhf"
    //   }
    // })
    //
    // let details = {
    //   from: "daudiep2003@gmail.com",
    //   to : "daudiep2003@gmail.com",
    //   subject: "testing our nodemailer",
    //   text: "testing out first sender"
    // }
    //
    // mailTransporter.sendMail(details, (err : any) =>{
    //   if (err){
    //     console.log("it has an error" , err);
    //   }else {
    //     console.log("email has send !");
    //   }
    // })

  }

}
