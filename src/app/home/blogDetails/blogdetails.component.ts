import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../services/contact.service";
import {Cart} from "../../models/cart";
import {Blog} from "../../models/blog";
import {BlogService} from "../../services/blog.service";
import {Product} from "../../models/product";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../models/comment";

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})

export class BlogDetailsComponent implements OnInit {

  totalMoney : number = 0 ;
  submited: boolean = false;
  id: number = 0;
  blogList : Array<Blog> = [];
  blog: Blog = new Blog();
  commentList: Array<Comment> = [];

  idNext : number = 0 ;
  count : number = 0 ;

  constructor(private contSrv : ContactService,
              private blogSrv : BlogService,
              private route: Router,
              private _route: ActivatedRoute,
              private comSrv : CommentService,) { }

  today = new Date();
  date = this.today.getDate()+ '/' + (this.today.getMonth() + 1 )+ '/' + this.today.getFullYear();

  commentCreate = new FormGroup({
    nameCustomer: new FormControl(''),
    content: new FormControl(''),
    date: new FormControl(this.date),
  });

  ngOnInit(): void {

    this.id = this._route.snapshot.params.id ;

    this.blogSrv.getOne(this.id).subscribe(data =>  {
      this.blog = data;
      const s = data.id;
      if(s == 10 ){
        this.idNext = 1 ;
      }else {
        this.idNext = s + 1 ;
      }
    });

    this.blogSrv.getblog().subscribe(data =>  {
      this.blogList = data;
    });

    this.comSrv.getcomment().subscribe(data =>  {
      this.commentList = data;
      // CART TOTAL
      for (const datum of this.commentList) {
        this.count += 1;
      }
    });


  }

  public onLoadBlog():void{
    location.reload();
  }
  public onNext():void{
    // alert(this.idNext)
    location.replace('../blogDetails/'+ this.idNext);
  }
  public onFeature(id:number):void{
    location.replace('../blogDetails/'+ id);
  }

  public onCreate(): void {
    this.submited = true ;

    if ( this.commentCreate.invalid){
      alert("Please continue to travel with information")
      return;

    }else {
      this.comSrv.create(this.commentCreate.value).subscribe(data =>{
        if (confirm("Add Comment Success")) {
          location.reload();
        }
      });

    }
  }

}
