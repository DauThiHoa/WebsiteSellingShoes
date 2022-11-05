import { Injectable } from '@angular/core';
import { Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {
  // @ts-ignore
  private auth2: gapi.auth2.GoogleAuth
  // @ts-ignore
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor() {
    // @ts-ignore
    gapi.load("auth2", () => {
         // @ts-ignore
      this.auth2 = gapi.auth2.init({
           client_id: '1083374614667-99jiu0j9lbouuitlto4a6efuqcm89i2o.apps.googleusercontent.com'
         })
    })
  }
  public signIn(){
    // @ts-ignore
    this.auth2.signIn({

      scope: 'https://www.googleapis.com/auth/gmail.readonly'
      // @ts-ignore
    }).then( user => {
       this.subject.next(user)
    }).catch(() => {
       // this.subject.next(null)
    })
  }

  public signOut(){
    // @ts-ignore
    this.auth2.signOut()
      .then( () => {
       // this.subject.next(null)
    })
  }
  // @ts-ignore
  public observable() : Observable<gapi.auth2.GoogleUser>{
    return this.subject.asObservable()
  }
}
