import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import {SocialLoginModule,AuthServiceConfig,GoogleLoginProviderc} from "./ng4-social-login-master/src";
// client id for the google login

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdbAccordionModule} from 'mdb-angular-ui-kit/accordion';
import {MdbAutocompleteModule} from 'mdb-angular-ui-kit/autocomplete';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import {MdbChartModule} from 'mdb-angular-ui-kit/charts';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {MdbDatepickerModule} from 'mdb-angular-ui-kit/datepicker';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbInfiniteScrollModule} from 'mdb-angular-ui-kit/infinite-scroll';
import {MdbLazyLoadingModule} from 'mdb-angular-ui-kit/lazy-loading';
import {MdbLightboxModule} from 'mdb-angular-ui-kit/lightbox';
import {MdbLoadingModule} from 'mdb-angular-ui-kit/loading';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import {MdbNotificationModule} from 'mdb-angular-ui-kit/notification';
import {MdbPopconfirmModule} from 'mdb-angular-ui-kit/popconfirm';
import {MdbPopoverModule} from 'mdb-angular-ui-kit/popover';
import {MdbRadioModule} from 'mdb-angular-ui-kit/radio';
import {MdbRangeModule} from 'mdb-angular-ui-kit/range';
import {MdbRatingModule} from 'mdb-angular-ui-kit/rating';
import {MdbRippleModule} from 'mdb-angular-ui-kit/ripple';
import {MdbScrollbarModule} from 'mdb-angular-ui-kit/scrollbar';
import {MdbScrollspyModule} from 'mdb-angular-ui-kit/scrollspy';
import {MdbSelectModule} from 'mdb-angular-ui-kit/select';
import {MdbSidenavModule} from 'mdb-angular-ui-kit/sidenav';
import {MdbSmoothScrollModule} from 'mdb-angular-ui-kit/smooth-scroll';
import {MdbStepperModule} from 'mdb-angular-ui-kit/stepper';
import {MdbStickyModule} from 'mdb-angular-ui-kit/sticky';
import {MdbTableModule} from 'mdb-angular-ui-kit/table';
import {MdbTabsModule} from 'mdb-angular-ui-kit/tabs';
import {MdbTimepickerModule} from 'mdb-angular-ui-kit/timepicker';
import {MdbTooltipModule} from 'mdb-angular-ui-kit/tooltip';
import {MdbValidationModule} from 'mdb-angular-ui-kit/validation';
import {MdbCalendarModule} from 'mdb-angular-calendar';
import {MdbWysiwygModule} from 'mdb-angular-wysiwyg';
import {MdbDragAndDropModule} from 'mdb-angular-drag-and-drop';
import {MdbVectorMapModule} from 'mdb-angular-vector-maps';
import {MdbFileUploadModule} from 'mdb-angular-file-upload';
import {MdbTreeviewModule} from 'mdb-angular-treeview';
import {MdbTransferModule} from 'mdb-angular-transfer';
import {MdbMentionModule} from 'mdb-angular-mention';
import {MdbCookiesManagementService} from 'mdb-angular-cookies-management';
import {MdbStorageManagementService} from 'mdb-angular-storage-management';
import {MyTableComponent} from './my-table/my-table.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {ProductModule} from "./product/product.module";
import {HttpClientModule} from "@angular/common/http";
// THEM MODULE
import {ServicesModule} from "./services/services.module";
import {TestModule} from "./test/test.module";
import { HomeRoutingModule} from "./home/home-routing.module";
import {ProductListRoutingModule} from "./application/product-list/product-list-routing.module";
import {ProductCreateRoutingModule} from "./application/product-create/product-create-routing.module";
import {ProductEditRoutingModule} from "./application/product-edit/product-edit-routing.module";
import {ProductDetailRoutingModule} from "./components/product-detail/product-detail-routing.module";
import {CommonModule} from "@angular/common";
import {ProductCreateModule} from "./application/product-create/product-create.module";
import {HomeModule} from "./home/home.module";
import {ProductListModule} from "./application/product-list/product-list.module";
import {ProductEditModule} from "./application/product-edit/product-edit.module";
import {ProductDetailModule} from "./components/product-detail/product-detail.module";
import {CheckoutModule} from "./home/checkOut/checkout.module";
import {ContactRoutingModule} from "./home/contact/contact-routing.module";
import {ContactModule} from "./home/contact/contact.module";
import {BlogModule} from "./home/blog/blog.module";
import {BlogDetailsModule} from "./home/blogDetails/blogdetails.module";
import {CatModule} from "./dummy/cat/cat.module";
import {CowComponent} from "./dummy/cow/cow.component";
import {CowModule} from "./dummy/cow/cow.module";
import {DogModule} from "./dummy/dog/dog.module";
import {LoginModule} from "./login/login.module";
import {HttpService} from "./Shared/http.service";
import {DogComponent} from "./dummy/dog/dog.component";
import {CatComponent} from "./dummy/cat/cat.component";
import {ListProductModule} from "./home/listproduct/listproduct.module";
import {SteamProductModule} from "./home/productSteam/steamproduct.module";
import {RegisterModule} from "./register/register.module";
import {OriginProductModule} from "./home/productOrigin/originproduct.module";
import {PubgProductModule} from "./home/productPubg/pubgproduct.module";
import {WalletProductModule} from "./home/productSteamWallet/walletproduct.module";
import {ConProductModule} from "./home/productTLoi/conproduct.module";

// tmdt
import {ShopModule} from "./Admin/shop/shop.module";
import {ShopRoutingModule} from "./Admin/shop/shop-routing.module";
import {ProfileModule} from "./Admin/profile/profile.module";
import {ProfileRoutingModule} from "./Admin/profile/profile-routing.module";
import {HistoryModule} from "./Admin/history/history.module";
import {HistoryRoutingModule} from "./Admin/history/history-routing.module";
import {EmailModule} from "./Admin/email/email.module";
import {EmailRoutingModule} from "./Admin/email/email-routing.module";

// @ts-ignore
@NgModule({
  // declarations: [AppComponent, MyTableComponent, HomeComponents],
  declarations: [AppComponent, MyTableComponent],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SocialLoginModule,
    // AuthServiceConfig,
    // GoogleLoginProvider
  ],
  imports: [
    // THEM CAC MODULE VOI COMPONENT
    // HomeModule
    BrowserModule,
    // @ts-ignore
    // SocialLoginModule.initialize (config),
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbAutocompleteModule,
    MdbCarouselModule,
    MdbChartModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDatepickerModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbInfiniteScrollModule,
    MdbLazyLoadingModule,
    MdbLightboxModule,
    MdbLoadingModule,
    MdbModalModule,
    MdbNotificationModule,
    MdbPopconfirmModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRatingModule,
    MdbRippleModule,
    MdbScrollbarModule,
    MdbScrollspyModule,
    MdbSelectModule,
    MdbSidenavModule,
    MdbSmoothScrollModule,
    MdbStepperModule,
    MdbStickyModule,
    MdbTableModule,
    MdbTabsModule,
    MdbTimepickerModule,
    MdbTooltipModule,
    MdbValidationModule,
    MdbCalendarModule,
    MdbWysiwygModule,
    MdbDragAndDropModule,
    MdbVectorMapModule,
    MdbFileUploadModule,
    MdbTreeviewModule,
    MdbTransferModule,
    MdbMentionModule,


    FormsModule,
    ReactiveFormsModule,
    // SocialLoginModule,
    RouterModule,
    AppRoutingModule,
    ProductModule,
    ServicesModule,
    TestModule,
    // HomeModule,
    HomeRoutingModule,
    // CarouselModule,
    HttpClientModule,
    ProductListRoutingModule,
    ProductCreateRoutingModule,
    ProductEditRoutingModule,
    ProductDetailRoutingModule,
    HomeModule,
    ProductCreateModule,
    ProductListModule,
    ProductEditModule,
    ProductDetailModule,
    CheckoutModule,
    ContactModule,
    BlogModule,
    BlogDetailsModule,
    CatModule,
    CowModule,
    DogModule,
    LoginModule,
    ListProductModule,
    SteamProductModule,
    RegisterModule,
    OriginProductModule,
    PubgProductModule,
    WalletProductModule,
    ConProductModule,


    ShopModule,
    ShopRoutingModule,
    ProfileModule,
    ProfileRoutingModule,
    HistoryModule,
    HistoryRoutingModule,
    EmailModule,
    EmailRoutingModule,


  ],
  providers: [
    MdbCookiesManagementService,
    MdbStorageManagementService,
    HttpService],
  entryComponents: [DogComponent,CowComponent,CatComponent],
  bootstrap: [AppComponent],
})


export class AppModule {

}
