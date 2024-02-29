import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserLogin } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private UserLogin: IUserLogin = {
    isUserLogedIn: new BehaviorSubject(false),
  };

  constructor(private _http: HttpClient) { }

  baseURL: string = 'https://localhost:7182/';

  loginUser(loginDetails:any): Observable<any>{
    let token!:string;
    return this._http.post<any>(this.baseURL + 'login', {email: loginDetails.email, password: loginDetails.password})
    // .subscribe((resp) => {
    //   token = resp.token
    //   console.log("response is: ",resp);
    //   console.log("token is: ", token);
    // });
    // console.log(token);
    // return token;
    // console.log(token);
  }

  setUserLoginStatus(val:boolean){
    this.UserLogin.isUserLogedIn.next(val);
  }

  getUserLoginStatus():Observable<boolean>{
    return this.UserLogin.isUserLogedIn.asObservable();
  }
}
