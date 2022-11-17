import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  [x: string]: any;
  test = "How r u?";
  constructor(private http: HttpClient) {}

  httpGet(url : string) {
    return this.http.get(url);
  }

  httpPost(url : string , {}) {
    return this.http.post(url, { name: "Subrat" });
  }

  sendEmail(url : string , data : any) {
    alert("3 : " + url + " = " + data )
    return this.http.post(url, data);
  }
}
