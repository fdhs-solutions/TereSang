import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

  constructor(private router: Router) {}

  navigateToRegistration() {
    // Navigate to registration page
    this.router.navigate(['/registration']);
  }

  navigateToLogin() {
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  navigateToAbout() {
    // Navigate to about page
    this.router.navigate(['/about']);
  }

  navigateToContact() {
    // Navigate to contact page
    this.router.navigate(['/contact']);
  }

  navigateToPrivacy() {
    // Navigate to privacy policy page
    this.router.navigate(['/privacy']);
  }

  navigateToTerms() {
    // Navigate to terms of service page
    this.router.navigate(['/terms']);
  }

  navigateToHelp() {
    // Navigate to help center
    this.router.navigate(['/help']);
  }

  navigateToFAQ() {
    // Navigate to FAQ page
    this.router.navigate(['/faq']);
  }

  navigateToSafety() {
    // Navigate to safety tips page
    this.router.navigate(['/safety']);
  }
}
