import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements OnInit {
  gender: string = '';
  ageFrom: string = '';
  ageTo: string = '';
  religion: string = '';
  motherTongue: string = '';
  loading: boolean = false;
  showContactDetails: boolean = false;
  errors: { [key: string]: string } = {};

  ages: number[] = Array.from({ length: 43 }, (_, i) => i + 18);

  religions: string[] = [
    "Hindu", "Muslim", "Christian", "Sikh", "Parsi",
    "Jain", "Buddhist", "Jewish", "No Religion", "Spiritual", "Other"
  ];

  languages: string[] = [
    "Bengali", "English", "Gujarati", "Hindi", "Kannada",
    "Marathi", "Marwari", "Odia", "Punjabi", "Tamil", "Telugu", "Urdu"
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showContactDetails = true;
    localStorage.removeItem("userInfo");
  }

  handleCardClick(event: Event): void {
    event.preventDefault();
    this.showContactDetails = !this.showContactDetails;
  }

  handleBeginClick(): void {
    const newErrors: { [key: string]: string } = {};

    if (!this.gender) newErrors['gender'] = "Please select a gender.";
    if (!this.ageFrom) newErrors['ageFrom'] = "Please select an age from.";
    if (!this.ageTo) newErrors['ageTo'] = "Please select an age to.";
    if (parseInt(this.ageFrom) > parseInt(this.ageTo))
      newErrors['ageTo'] = "Age To must be greater than or equal to Age From.";
    if (!this.religion) newErrors['religion'] = "Please select a religion.";
    if (!this.motherTongue) newErrors['motherTongue'] = "Please select a mother tongue.";

    this.errors = newErrors;

    // If no errors, proceed with the action
    if (Object.keys(newErrors).length === 0) {
      this.loading = true;
      this.router.navigate(['/login']);
    }
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
