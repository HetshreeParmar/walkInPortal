import { Component, ElementRef, OnInit } from '@angular/core';
import { UserLoginService } from '../services/user-login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isUserLogedIn: any;
  showPassword = false;
  passwordType = 'password';
  private _text = 'text';
  private _password = 'password';
  userLoginDetails = {
    email: null,
    password: null
  }
  constructor(private _userLoginService: UserLoginService, private _router:Router, private elementRef: ElementRef<HTMLElement>){ }
  loginUserClicked() {
    this._userLoginService.loginUser(this.userLoginDetails).subscribe((resp)=> {
      if(resp.token == 'User not found' || resp.token == 'Password doesnt match')
      {
        alert("Please enter valid credentials");
      }else{
        this._userLoginService.setUserLoginStatus(true);
        localStorage.setItem('token', resp.token);
        this._router.navigate(['/allJobs']);
      }
    });
    //console.log("called login details", this._userLoginService.loginUser(this.userLoginDetails));
    // console.log("At login : ", token);
    // if(token == 'User not found' || token == 'Password doesnt match')
    // {
    //   alert("Please enter valid credentials")
    // }else{
    //   this._userLoginService.setUserLoginStatus(true);
    //   this._router.navigate(['/allJobs']);
    // }
  }
  ngOnInit(): void {
    this.isUserLogedIn = this._userLoginService.getUserLoginStatus();
  }
  togglePassword(){
    this.passwordType === this._password
     ? (this.passwordType = this._text)
     : (this.passwordType = this._password);
  }
}
