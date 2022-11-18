import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators} from '@angular/forms';
// import './../../../assets/js/smtp.js';
import './../../../src/assets/smtp';
import {ProfileService} from "../services/profile.service"; //file path may change →
declare let Email: any;

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

  constructor(private builder: FormBuilder,
              private profile: ProfileService, ) { }

  ngOnInit(): void {

  }
  FromLogin = new FormGroup({
    email : new FormControl(""),
    password : new FormControl(""),
  });

  onSubmit(f: NgForm) {

    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'daudiep2003@gmail.com',
      Password : 'kxiunzutpxcvbbhf',
      To : 'daudiep2003@gmail.com',
      From : `daudiep2003@gmail.com`,
      Subject : "this.model.subject",
      Body : `
<i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>name<br /> <b>Email: </b>email<br /> <b>Subject: </b>subject<br /> <b>Message:</b> <br />message<br><br> <b>~End of Message.~</b> `
    }).then( (message: any) => {alert(message); f.resetForm(); } );

  }

  onSubmit1() {

    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'daudiep2003@gmail.com',
      Password : 'kxiunzutpxcvbbhf',
      To : 'daudiep2003@gmail.com',
      From : `daudiep2003@gmail.com`,
      Subject : "this.model.subject",
      Body : `
<i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>name<br /> <b>Email: </b>email<br /> <b>Subject: </b>subject<br /> <b>Message:</b> <br />message<br><br> <b>~End of Message.~</b> `
    }).then( (message: any) => {alert(message); } );

  }
}
