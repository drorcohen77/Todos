import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../User.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private registerUrl = "/api/users/register";
  private loginUser = "/api/users/login";

  constructor(private http: HttpClient) { }

  registerUser(userName: string, email: string, password: string): Observable<User> {

    return this.http.post<User>(this.registerUrl, 
      {
        user_name: userName,
        email: email,
        password: password
      }
    );
  }

}
