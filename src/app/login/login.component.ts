import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLoginService } from '../services/user-login.service';
import { Router } from '@angular/router';

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
  constructor(private _userLoginService: UserLoginService, private _router:Router, private elementRef: ElementRef<HTMLElement>){ }
  loginUserClicked() {
    this._userLoginService.setUserLoginStatus(true);
    this._router.navigate(['/allJobs']);
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
