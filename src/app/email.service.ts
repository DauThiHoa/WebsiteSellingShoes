import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {response} from "express";

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  private url = "";

  constructor(private http: HttpClient) {
  }
  // SendEmail(input: any) {
  //   return this.http.post(this.url, input, response).pipe(
  //     map(
  //       (response) => {
  //         if (response) {
  //           return response
  //         }
  //       },
  //       (error) => {
  //         if (error) {
  //           return error
  //         }
  //       }
  //     )
  //   )
  // }

}
