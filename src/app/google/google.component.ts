import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit{
  title = 'Codingvila Login With Google';
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  constructor() { }
  ngOnInit() {

    this.googleAuthSDK();
  }

  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '475421461262-lssg7cvgfreuue3tk1ptqf2j7f9nbk88.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
}

