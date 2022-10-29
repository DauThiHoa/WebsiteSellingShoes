import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  submited : boolean = false ;

  constructor(private  prodSrv : ProductService ,
              private  route: Router) {
  }
    productFormCreate = new FormGroup({
         name : new FormControl('',[ Validators.required , Validators.minLength(6)]),
         price : new FormControl('',[ Validators.required , Validators.min(10000)]),
         sale_price : new FormControl('',[ Validators.required , Validators.min(0)]),
         image : new FormControl('',[ Validators.required , Validators.minLength(6)]),
       });

  ngOnInit(): void {
  }
  // TRA VE TAT CA CAC CONTROLS
  get f (){
    return this.productFormCreate.controls;
  }
  public onCreate(): void {
    this.submited = true ;
    if ( this.productFormCreate.invalid){
      return;
    }else {
      this.prodSrv.create(this.productFormCreate.value).subscribe(data =>{
        if (confirm("Add Product Success")) {
           this.route.navigate(['/product-list']);
        }
      });
     }
   }
}
