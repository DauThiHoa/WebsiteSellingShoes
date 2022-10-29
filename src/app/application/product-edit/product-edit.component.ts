import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id: number = 0 ;
  constructor(private  prodSrv : ProductService ,
              private _route :ActivatedRoute) { }

  public productFormEdit = new FormGroup({
    name : new FormControl(),
    price : new FormControl(),
    sale_price : new FormControl(),
    image : new FormControl()
  });

  ngOnInit(): void {
    this.id = this._route.snapshot.params.id ;

    this.prodSrv.getOne(this.id).subscribe(data =>{
    this.productFormEdit = new FormGroup({
        name : new FormControl(data.name),
        price : new FormControl(data.price),
        sale_price : new FormControl(data.sale_price),
        image : new FormControl(data.image)
      });
    })
  }
  public onUpdate() {
     this.prodSrv.update(this.id,this.productFormEdit.value).subscribe(data =>{
       console.log(data);
     });
  }

}
