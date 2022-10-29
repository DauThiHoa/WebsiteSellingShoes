import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Data} from "../data";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product:{ [p: string]: any } | undefined;

  constructor(private router: Router, private data: Data) {
    this.product = router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl('/products');
  }
}
