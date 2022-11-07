import { Injectable } from '@angular/core';
import { Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {

  private auth2: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
           client_id: '1083374614667-99jiu0j9lbouuitlto4a6efuqcm89i2o.apps.googleusercontent.com'
         })
    })
  }
  public signIn(){

    this.auth2.signIn({

      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }).then( user => {
       this.subject.next(user)
    }).catch(() => {
       // @ts-ignore
      this.subject.next(null)
    })
  }

  public signOut(){

    this.auth2.signOut()
      .then( () => {
        // @ts-ignore
       this.subject.next(null)
    })
  }

  public observable() : Observable<gapi.auth2.GoogleUser>{
    return this.subject.asObservable()
  }
}
