import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routers: Routes = [
  // Them duong dan link toi trang ts

  {path: '', pathMatch: 'full', redirectTo: '/products'},
  {path: '', pathMatch: 'full', redirectTo: '/test' },
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '', pathMatch: 'full', redirectTo: '/product-list'},
  {path: '', pathMatch: 'full', redirectTo: '/productDetail/:id'},
  {path: '', pathMatch: 'full', redirectTo: '/product-create' },
  {path: '', pathMatch: 'full', redirectTo: '/product-edit/:id'},
  {path: '', pathMatch: 'full', redirectTo: '/checkout'},
  {path: '', pathMatch: 'full', redirectTo: '/contact'},
  {path: '', pathMatch: 'full', redirectTo: '/blog'},
  {path: '', pathMatch: 'full', redirectTo: '/blogDetails/:id'},
  {path: '', pathMatch: 'full', redirectTo: '/listproduct'},
  {path: '', pathMatch: 'full', redirectTo: '/steamproduct'},
  {path: '', pathMatch: 'full', redirectTo: '/originproduct'},
  {path: '', pathMatch: 'full', redirectTo: '/pubgproduct'},
  {path: '', pathMatch: 'full', redirectTo: '/walletproduct'},
  {path: '', pathMatch: 'full', redirectTo: '/conproduct'},


  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: '', pathMatch: 'full', redirectTo: '/register'},
  {path: '', pathMatch: 'full', redirectTo: '/cow'},
  {path: '', pathMatch: 'full', redirectTo: '/dog'},
  {path: '', pathMatch: 'full', redirectTo: '/cat'},

  // tmdt
  {path: '', pathMatch: 'full', redirectTo: '/shop'},
  {path: '', pathMatch: 'full', redirectTo: '/profile'},
  {path: '', pathMatch: 'full', redirectTo: '/history'},
  {path: '', pathMatch: 'full', redirectTo: '/email'},
  {path: '', pathMatch: 'full', redirectTo: '/forgetPassword'},
  {path: '', pathMatch: 'full', redirectTo: '/google'},
];

const child: Routes = [
  // Them duong dan link toi trang ts
  {path: '', pathMatch: 'full', redirectTo: '/products'},
  {path: '', pathMatch: 'full', redirectTo: '/test' },
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '', pathMatch: 'full', redirectTo: '/product-list'},
  {path: '', pathMatch: 'full', redirectTo: '/productDetail/:id'},
  {path: '', pathMatch: 'full', redirectTo: '/product-create' },
  {path: '', pathMatch: 'full', redirectTo: '/product-edit/:id'},
];

// THAY LAM
@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routers),
    // RouterModule.forRoot(child)
  ]
})

// @NgModule({
//    imports: [RouterModule.forRoot(routers)],
//    exports: [RouterModule]
// })

export class AppRoutingModule { }
