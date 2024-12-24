import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  // user = {
  //   name: 'Sankar Galla',
  //   profilePicUrl: 'assets/images/profile.jpg' // Replace with the actual path to your profile picture
  // };

  user: any;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
      this.user = this.authService.getLoggedInUser();
      // if (this.user) {
      //   console.log('Logged in user details:', this.user.fullName);
      // } else {
      //   console.log('No user is logged in.');
      // }
  }

  logout(): void {
    this.authService.logout();
    console.log('User logged out');
  }
}
