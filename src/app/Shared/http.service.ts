import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  post(arg0: string, data: { to: string; subject: string; txt: string; }) {
      throw new Error('Method not implemented.');
  }
  test = "How r u?";
  constructor(private http: HttpClient) {}

  httpGet(url: any) {
    return this.http.get(url);
  }

  httpPost(url: any, {}) {
    return this.http.post(url, { name: "Subrat" });
  }

  sendEmail(url : any, data : any) {
    return this.http.post(url, data);
  }
}
