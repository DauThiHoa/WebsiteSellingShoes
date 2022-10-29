import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})


export class RegisterComponent implements OnInit {
  submited : boolean = false ;
  FromRegister = new FormGroup({
    name : new FormControl(""),
    email : new FormControl(""),
    password : new FormControl(""),
  });

  constructor(private  prodSrv : LoginService ,
              private  route: Router) {}

  ngOnInit() {
  }

  public onRegister(): void {

    if ( this.FromRegister.invalid){
      if (confirm("Please fill in all the information")) {
        this.route.navigate(['/register']);
        this.submited = false ;
      }
    }
      this.prodSrv.getlogin().subscribe(data => {
        for (const datum of data) {
          if (datum.email == this.FromRegister.controls.email.value) {
            if (confirm("Email already registered with another account")) {
              this.submited = false;
              this.route.navigate(['/register']);
            }
          }
        }
        this.submited = true;
        if(this.submited) {
          this.prodSrv.create(this.FromRegister.value).subscribe(data =>{
            if (confirm("Register Success")) {
              this.route.navigate(['/login']);
            }
          });
        }
        return;
      });

    }

}
