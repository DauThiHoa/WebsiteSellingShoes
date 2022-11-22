import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
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
  title: 'google-signin';
  submited : boolean = false ;

  user : gapi.auth2.GoogleUser;

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

      // console.log('ElementRef: ', this.element);
      // gapi.load('auth2', function () {
      // gapi.auth2.init()
    // });
  }

  ngOnInit(): void {
  //  SEND MAIL
  //   console.log(this.http.test);

    this.signInService.observable().subscribe(user => {
      this.user = user;
      this.ref.detectChanges();
    })

  }

  signIn (){
    this.signInService.signIn()
  }
  signOut (){
    this.signInService.signOut()
  }

  onSubmit() {

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
