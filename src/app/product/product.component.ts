import {Component, OnInit} from '@angular/core';
import {Data} from './data';
import {NavigationExtras, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-modal',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title = 'Product List';
  header: string[];
  data: any[];
  navigationExtras: NavigationExtras;

  constructor(private productService: ProductService, private router: Router,public modalRef: MdbModalRef<ProductComponent>) {
    this.header = ['OrderDate', 'Region', 'Rep', 'Item', 'Units', 'UnitCost', 'Total'];
  }

  ngOnInit() {
    this.getProductList()
  }

  getProductList() {
    this.productService.getProducts()
      .subscribe(value => this.data = Object.entries(value).map(v => v[1]));
  }

  view(row: any[]) {
    this.navigationExtras = {state: row};
    this.router.navigateByUrl('/product-detail/${row[0]}', this.navigationExtras);

  }
}
