import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"

})

export class HttpService {
  test = "How r u?";
  data : {name : any , email : any};

  constructor(private http: HttpClient) {
    let data : {name : any , email : any};
  }

  httpGet(url: string) {
    return this.http.get(url);
  }

  httpPost(url: string, {}) {
    return this.http.post(url, { name: "Subrat" });
  }

  sendEmail(url: string, data : {name : any , email : any} ) {
    return this.http.post(url, data);
  }

}
