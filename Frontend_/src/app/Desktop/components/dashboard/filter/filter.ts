import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filter.html',
  styleUrls: ['./filter.scss']
})
export class Filter {
  // Example static filter state
  searchTerm: string = '';
  minAge: number | null = null;
  maxAge: number | null = null;
  location: string = '';
  religion: string = '';

  @Output() applyFilters = new EventEmitter<any>();
  @Output() clearFilters = new EventEmitter<void>();

  onApplyFilters() {
    this.applyFilters.emit({
      searchTerm: this.searchTerm,
      minAge: this.minAge,
      maxAge: this.maxAge,
      location: this.location,
      religion: this.religion
    });
  }

  onClearFilters() {
    this.searchTerm = '';
    this.minAge = null;
    this.maxAge = null;
    this.location = '';
    this.religion = '';
    this.clearFilters.emit();
  }

  get ageOptions() {
    return Array.from({ length: 43 }, (_, i) => i + 18); // 18 to 60
  }

  religions = [
    'Hindu',
    'Muslim',
    'Christian',
    'Sikh',
    'Parsi',
    'Jain',
    'Buddhist',
    'Jewish',
    'No Religion',
    'Spiritual',
    'Other'
  ];
}
