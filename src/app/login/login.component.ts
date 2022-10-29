import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

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

  constructor(private  prodSrv : LoginService ,
              private  route: Router) {}

  ngOnInit() {
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

}
