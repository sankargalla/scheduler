import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
  })

constructor(public fb: FormBuilder, public authService: AuthService, private messageService: MessageService){ }

get email() {
  return this.loginForm.controls['email'];
}

get password() {
  return this.loginForm.controls['password'];
}

submitUserLogin() {
  const postData = { 
    email: this.loginForm.get('email')?.value || '', 
    password: this.loginForm.get('password')?.value || '' 
  };
  
  if (postData.email && postData.password) {
    this.authService.setUser(postData.email, postData.password);
    this.authService.userLogin(postData.email, postData.password).subscribe(
      response => {
        window.location.href = '/employee'; 
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: response,
        });
      },
      error => {
        
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid email or password',
        });
        console.error(error);
      }
    );
  } else {
    
    console.error('Email or password is missing');
  }
}
}
