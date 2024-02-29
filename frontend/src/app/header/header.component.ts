import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isUserLogedIn!: boolean;
  constructor(private _userLoginService : UserLoginService) { }
  ngOnInit(): void {
    this._userLoginService.getUserLoginStatus().subscribe((resp:boolean)=>{
      this.isUserLogedIn = resp;
    })
  }
}
