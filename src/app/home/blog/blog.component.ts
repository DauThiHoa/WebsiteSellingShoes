import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";
import {Cart} from "../../models/cart";
import {Blog} from "../../models/blog";
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {

  totalMoney : number = 0 ;
  id : number = 0 ;
  submited: boolean = false;

  blogList : Array<Blog> = [];

  constructor(private contSrv : ContactService,
              private blogSrv : BlogService,
              private route: Router) { }

  today = new Date();
  date = this.today.getDate()+ '/' + (this.today.getMonth() + 1 )+ '/' + this.today.getFullYear();

  contactCreate = new FormGroup({

    name: new FormControl(''),
    email: new FormControl("", [ Validators.required, Validators.email ]),
    phone: new FormControl(''),
    topic: new FormControl(''),
    message: new FormControl(''),
    date: new FormControl(this.date),
  });

  ngOnInit(): void {

    this.blogSrv.getblog().subscribe(data =>  {
      this.blogList = data;
    });

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
  public onLoadBlog():void{
    location.reload();
  }

}
