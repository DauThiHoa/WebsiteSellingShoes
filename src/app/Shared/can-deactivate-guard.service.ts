import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
// import { ProfileComponent } from '../profile/profile.component';

@Injectable({
  providedIn: 'root'
})
// export class CanDeactivateGuardService implements CanDeactivate<ProfileComponent>{

export class CanDeactivateGuardService {
  constructor() { }

  // canDeactivate(component: ProfileComponent) {
  //   console.log("in desctibe Guard");
  //   return component.canDeactivate ? component.canDeactivate() : true;
  // }

  canDeactivate( ) {
    console.log("in desctibe Guard");
  }
}
