import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Profile {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  age: number;
  gender: string;
  langKnown: string;
  religion: string;
  community: string;
  residence: string;
  image?: string;
}

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.scss']
})
export class ProfileCard {
  pageSize = 5;
  page = 0;

  allProfiles: Profile[] = [
    {
      firstName: 'Rahul',
      lastName: 'Sharma',
      mobileNumber: '9999990001',
      age: 28,
      gender: 'Male',
      langKnown: 'Hindi, English',
      religion: 'Hindu',
      community: 'Brahmin',
      residence: 'Mumbai',
      image: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
      firstName: 'Priya',
      lastName: 'Verma',
      mobileNumber: '9999990002',
      age: 26,
      gender: 'Female',
      langKnown: 'Hindi',
      religion: 'Hindu',
      community: 'Kayastha',
      residence: 'Delhi',
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      firstName: 'Aman',
      lastName: 'Khan',
      mobileNumber: '9999990003',
      age: 30,
      gender: 'Male',
      langKnown: 'Urdu, English',
      religion: 'Muslim',
      community: 'Sunni',
      residence: 'Bangalore',
      image: 'https://randomuser.me/api/portraits/men/33.jpg'
    }
  ];

  profiles: Profile[] = [...this.allProfiles];
  totalPages = Math.ceil(this.profiles.length / this.pageSize);

  searchTerm = '';
  minAge: number | null = null;
  maxAge: number | null = null;
  location = '';
  religion = '';

  handleApplyFilters() {
    let filtered = this.allProfiles;

    if (this.searchTerm) {
      filtered = filtered.filter((p) =>
        `${p.firstName} ${p.lastName}`
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.minAge !== null && this.maxAge !== null) {
      filtered = filtered.filter(
        (p) => p.age >= this.minAge! && p.age <= this.maxAge!
      );
    }

    if (this.location) {
      filtered = filtered.filter((p) =>
        p.residence.toLowerCase().includes(this.location.toLowerCase())
      );
    }

    if (this.religion) {
      filtered = filtered.filter(
        (p) => p.religion.toLowerCase() === this.religion.toLowerCase()
      );
    }

    this.profiles = filtered;
    this.page = 0;
    this.totalPages = Math.ceil(this.profiles.length / this.pageSize);
  }

  handleClearFilters() {
    this.searchTerm = '';
    this.minAge = null;
    this.maxAge = null;
    this.location = '';
    this.religion = '';
    this.profiles = [...this.allProfiles];
    this.page = 0;
    this.totalPages = Math.ceil(this.profiles.length / this.pageSize);
  }

  paginatedProfiles() {
    const start = this.page * this.pageSize;
    return this.profiles.slice(start, start + this.pageSize);
  }
}
