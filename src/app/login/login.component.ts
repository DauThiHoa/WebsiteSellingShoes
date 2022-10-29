import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import { DogComponent } from "../dummy/dog/dog.component";
import { CowComponent } from "../dummy/cow/cow.component";
import { CatComponent } from "../dummy/cat/cat.component";
import {HttpService} from "../Shared/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})


export class LoginComponent implements OnInit {
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

  dummyComponent = DogComponent;
  constructor(private  prodSrv : LoginService ,
              private  route: Router,
              public http: HttpService ) {}

  ngOnInit() {
  //  SEND MAIL
    console.log(this.http.test);
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
            this.route.navigate(['/home']);
            return;
          }
        }
        if (confirm("Email or password error")) {
          this.route.navigate(['/login']);
        }
      });
    }
  }

// Bai SEND MAIL
//   assignComponent(component) {
//     if (component === "cow") this.dummyComponent = CowComponent;
//     else if (component === "dog") this.dummyComponent = DogComponent;
//     else this.dummyComponent = CatComponent;
//   }

  changeImage() {
    this.http.test = "changed";
    this.image =
      "https://images.pexels.com/photos/635529/pexels-photo-635529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
  }

  register() {
    alert("hahaha" + this.FromLogin.controls.email.value + this.FromLogin.controls.password.value);

    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      // name: this.nameFormControl.value,
      // email: this.emailFormControl.value
      name: this.FromLogin.controls.password.value,
      email: this.FromLogin.controls.email.value
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }
}
