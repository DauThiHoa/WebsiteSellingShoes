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

  public onForgetPassword(e: Event) {

    // if ( this.FromLogin.invalid){
    //   if (confirm("Please fill in all the information")) {
    //     this.route.navigate(['/forgetPassword']);
    //   }
    //   return;
    // }else {
    //   this.prodSrv.getlogin().subscribe(data =>{
    //     for (const datum of data) {
    //       if(datum.email == this.FromLogin.controls.email.value){

            e.preventDefault();
            //service_7l0ixxe
            emailjs.sendForm('service_ql1in7p', 'template_ct39s0s', e.target as HTMLFormElement, 'QZDVBAB8rJEvzpViA')
              // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_PUBLIC_KEY')
              .then((result: EmailJSResponseStatus) => {
                console.log(result.text);
                location.replace("/login");
              }, (error) => {
                console.log(error.text);
                location.replace("/forgetPassword");
              });

          // }
    //     }
    //   });
    // }
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

}
