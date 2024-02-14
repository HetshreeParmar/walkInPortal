import { Injectable } from '@angular/core';
import { IUserLogin } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private UserLogin: IUserLogin = {
    isUserLogedIn: new BehaviorSubject(false),
  };

  setUserLoginStatus(val:boolean){
    this.UserLogin.isUserLogedIn.next(val);
  }

  getUserLoginStatus():Observable<boolean>{
    return this.UserLogin.isUserLogedIn.asObservable();
  }

  constructor() { }
}
