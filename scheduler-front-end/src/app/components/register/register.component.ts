import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../customValidators/password-validation.directives';
import { AuthService } from '../../services/auth.service';
import { user } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent {
  registerForm = this.fb.group({
    fullName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
    confirmPassword: ['',[Validators.required]]
  },{
    validators: passwordMatchValidator
  })

  constructor(public fb: FormBuilder, public authService: AuthService, public messageService: MessageService){ }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitUserDetails() {
    const postData = { ...this.registerForm.value};
    delete postData.confirmPassword;
    this.authService.registerUser(postData as user).subscribe(
      response => {
        window.location.href = '/login'
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: response,
        });
        console.log("asdhj ",response)
      },
      error => {
        
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: error.error,
        });
        console.error(error);
      }
    )
  }
}
