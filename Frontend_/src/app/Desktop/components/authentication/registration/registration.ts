import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.scss']
})
export class RegistrationComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  ageRange: number[] = [];

  registrationData = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    religion: '',
    community: '',
    address: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateAgeRange();
  }

  generateAgeRange() {
    // Generate age range from 18 to 80
    for (let i = 18; i <= 80; i++) {
      this.ageRange.push(i);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegister() {
    if (this.validateForm()) {
      this.isLoading = true;

      // Simulate registration process
      setTimeout(() => {
        console.log('Registration data:', this.registrationData);
        // Here you would typically call your registration service
        // For now, just simulate a successful registration
        this.isLoading = false;
        // Redirect to login page after successful registration
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

  validateForm(): boolean {
    // Check if passwords match
    if (this.registrationData.password !== this.registrationData.confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }

    // Check if all required fields are filled
    if (!this.registrationData.firstName || !this.registrationData.lastName ||
        !this.registrationData.mobileNumber || !this.registrationData.gender ||
        !this.registrationData.dateOfBirth || !this.registrationData.age ||
        !this.registrationData.religion || !this.registrationData.community ||
        !this.registrationData.address || !this.registrationData.password) {
      alert('Please fill in all required fields!');
      return false;
    }

    return true;
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
