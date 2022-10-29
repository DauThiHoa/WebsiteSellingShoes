import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  totalMoney : number = 0 ;
  id : number = 0 ;
  submited: boolean = false;

  constructor(private contSrv : ContactService,
              private route: Router) { }

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
