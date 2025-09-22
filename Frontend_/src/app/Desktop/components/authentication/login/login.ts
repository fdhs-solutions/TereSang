import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  showPassword = false;
  isLoading = false;

  loginData = {
    mobileNumber: '',
    password: ''
  };

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginData.mobileNumber && this.loginData.password) {
      this.isLoading = true;

      // Simulate login process
      setTimeout(() => {
        console.log('Login attempt:', this.loginData);
        // Here you would typically call your authentication service
        // For now, just simulate a successful login
        this.isLoading = false;
        // Redirect to dashboard or home page after successful login
        this.router.navigate(['/']);
      }, 2000);
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
