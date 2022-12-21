import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {BannerService} from "../../services/banner.service";
import {Banner} from "../../models/banner";
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {LoginService} from "../../services/login.service";
import {Login} from "../../models/login";
import {Profile} from "../../models/profile";
import {ProfileService} from "../../services/profile.service";
import {BillingService} from "../../services/billing.service";
import {Billing} from "../../models/billing";
import {HttpService} from "../../Shared/http.service";
// import nodemailer from "nodemailer";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

// FB
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import {CheckoutService} from "../../services/checkout.service";

@Component({
  selector: 'app-test',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponents implements OnInit {

  paymentHandler: any = null;

  success: boolean = false

  failure:boolean = false

  // method when component executes

















  // FB
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;


  [x: string]: any;
  submited: boolean = false;
  data: any[];
  profileOne: Profile;
  loginOne : Login;
  billingList :Array<Billing> = [];
  status : string;
  nodemailer : any;

  today = new Date();
  receipt = new Date();

  image =
    "https://images.freeimages.com/images/large-previews/7bc/bald-eagle-1-1400106.jpg";
  // name1 = st;
  // age = int ;
  loading = false;
  buttionText = "Submit";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  FromProfile = new FormGroup({
    id: new FormControl(1),
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    phoneNo : new FormControl(""),
    message : new FormControl(""),
    selectCountry: new FormControl(""),
  });

  FromLogin = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
  });


  banners : Array<Banner> = new Array<Banner>();
  products : Array<Product> = new Array<Product>();
  category : Array<Category> = new Array<Category>();

  productsList : Array<Product> = [];

  cartFormOneQuantity: FormGroup = new FormGroup({
  });
  formService: any;

  constructor(private bannerService:BannerService ,
              private cartSrv: CartService ,
              private productService:ProductService ,
              private categoryService:CategoryService ,
              private prodSrv : ProductService,
              private route: Router,
              public loginSrv: LoginService ,
              public profileSrv: ProfileService ,
              public billingSrv: BillingService ,
              public http: HttpService,
              private formBuilder: FormBuilder,
              private socialAuthService: SocialAuthService,
              private checkout: CheckoutService) {

    // FB
    console.log(this.isLoggedin);

    this.receipt.setDate(this.today.getDate() + 20);

  }

  ngOnInit(): void {

    // PAYMENT
    this.invokeStripe();

















    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });

    console.log(this.http.test);

    // LAY DU LIEU VAO TRANG HOME
    this.bannerService.getBanners()
      .subscribe(res => {
        this.banners = res;
      });
    this.productService.getProduct()
      .subscribe(res => {
        this.products = res;
      });
    this.categoryService.getCategory()
      .subscribe(res => {
        this.category = res;
      });

    // PHU THUOC VAO TRANG SERVE
    this.prodSrv.getList().subscribe(data =>{
      this.productsList = data ;
    })

    this.billingSrv.getBilling().subscribe(data => {
      this.billingList = data;
    })

    this.loginSrv.getOne(0).subscribe(data => {
      this.loginOne = data;
    })

    this.profileSrv.getOne(1).subscribe(data => {
      this.profileOne = data;

      this.FromProfile = new FormGroup({
        id: new FormControl(1),
        name: new FormControl(data.name),
        email: new FormControl(data.email),
        password: new FormControl(this.loginOne.password),
        phoneNo : new FormControl(data.phoneNo),
        message : new FormControl(data.message),
        selectCountry: new FormControl(data.selectCountry),
      });

    })


  }



















  public sendEmail(e: Event) {
    alert(e.target);
    e.preventDefault();
    //service_7l0ixxe
    emailjs.sendForm('service_ql1in7p', 'template_2c74bs8', e.target as HTMLFormElement, 'QZDVBAB8rJEvzpViA')
      // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_PUBLIC_KEY')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }

  onDelete(id:number){
    if (confirm("Do you want to delete the product?")){
      this.billingSrv.delete(id).subscribe(data =>{
        // Load data
        // Sửa đổi mặc định trong _limit = 4 => _limit = 10
        this.billingSrv.getList().subscribe(data =>  {
          this.billingList = data;
          // location.reload();
        })
      })
    }
  }

  public onClickProduct (id :number): void {
    // if (confirm(id+ 'h')) {
    this.route.navigate(['/productDetail/' + id]);
    // }
  }

  public onUpdateProfile (): void {
    this.submited = true;
    if (this.FromProfile.invalid) {
      if (confirm("Please fill in all the information")) {
        this.route.navigate(['/profile']);
      }
      return;
    } else {
      // this.route.navigate(['/home']);
      this.profileSrv.update(1, this.FromProfile.value).subscribe(data => {
         });

      this.FromLogin = new FormGroup({
        id: new FormControl(0),
        name: new FormControl(this.FromProfile.value.name),
        email: new FormControl(this.FromProfile.value.email),
        password: new FormControl(this.FromProfile.value.password),
      });

      this.loginSrv.update(0, this.FromLogin.value).subscribe(data => {
      });

      this.loginSrv.getlogin().subscribe(data => {
        for (const datum of data) {
            if ( datum.email == this.FromProfile.value.email){
              this.loginSrv.update(datum.id, this.FromLogin.value).subscribe(data => {
              });
            }
        }
      });

      if (confirm("Successfully updated")) {
        // this.route.navigate(['/profile']);
        location.replace("/profile");
      }
      return;

    }
  }

  public onCreateOneQuantity (id :number): void {
    this.prodSrv.getOne(id).subscribe(data => {

      // alert(id)
      this.cartFormOneQuantity = new FormGroup({
        id: new FormControl(id),
        name: new FormControl(data.name),
        image: new FormControl(data.image),
        price: new FormControl(data.price),
        quantitySold: new FormControl(1),
        total : new FormControl(data.price * 1)
      });

      this.submited = true;

      if (this.cartFormOneQuantity.invalid) {
        return;
      } else {
        this.cartSrv.create(this.cartFormOneQuantity.value).subscribe(data => {
          if (confirm("Add To Cart Success")) {
            this.route.navigate(['/product-list']);
          }
        });
      }
    })

    this.cartSrv.getOne(id).subscribe(data1 => {
      if (data1.id != null) {
        this.cartFormOneQuantity = new FormGroup({
          id: new FormControl(id),
          name: new FormControl(data1.name),
          image: new FormControl(data1.image),
          price: new FormControl(data1.price),
          quantitySold: new FormControl(data1.quantitySold + 1),
          total : new FormControl(data1.price * ( data1.quantitySold + 1 ))
        });
        this.cartSrv.update(id , this.cartFormOneQuantity.value).subscribe(data => {
          if (confirm("Add To Cart Success")) {
            this.route.navigate(['/product-list']);
          }
        });
      }else {
        return;
      }
    })
  }

  sendMail1() {
    const data = {
      to: 'daudiep2003@gmail.com',
      subject: 'Subject',
      txt: 'hello world'
    };

    // @ts-ignore
    return this.http.post('/api/mail', data).map((response: Response) =>{
      console.log (response.json());
      alert("lllllllllll");
    })
  }

  onMail () {

    if (this.receipt.getDate() < this.today.getDate()) {
      alert(" THIS TODAY : " + this.today.toLocaleDateString()
        + " THIS REQUEST : " + this.receipt.toLocaleDateString() );
     }
  }

  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    alert("nameFormControl : " + this.nameFormControl.value + " emailFormControl : " + this.emailFormControl.value);

    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }













  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

}
