import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";
import {LoginService} from "../../services/login.service";
import {Login} from "../../models/login";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  login: Login = new Login(); // any ( Nhan Tat Ca Cac Du Lieu )

  totalMoney : number = 0 ;
  id : number = 0 ;
  submited: boolean = false;

  constructor(private contSrv : ContactService,
              private route: Router,
              private loginSrv : LoginService) { }

  today = new Date();
  date = this.today.getDate()+ '/' + (this.today.getMonth() + 1 )+ '/' + this.today.getFullYear();

  contactCreate = new FormGroup({

    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    topic: new FormControl(''),
    message: new FormControl(''),
    date: new FormControl(this.date),
  });

  ngOnInit(): void {

    this.loginSrv.getOne(0).subscribe(data =>{
      this.login = data ;

      this.contactCreate = new FormGroup({

        name: new FormControl(data.name),
        email: new FormControl(data.email),
        phone: new FormControl(),
        topic: new FormControl(),
        message: new FormControl(),
        date: new FormControl(this.date),
      });

    })

  }

  public onCreate(): void {
    this.submited = true ;

    if ( this.contactCreate.invalid){
      alert("Please continue to travel with information")
      return;

    }else {
        this.contSrv.create(this.contactCreate.value).subscribe(data =>{
          if (confirm("Add Contact Success")) {
            location.reload();
          }
        });

    }
  }

}
