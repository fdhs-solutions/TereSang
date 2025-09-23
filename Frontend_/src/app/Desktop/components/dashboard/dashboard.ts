import { Component } from '@angular/core';
import { ProfileCard } from './profile-card/profile-card';
import { Navbar } from '../navbar/navbar';
import { Filter } from './filter/filter';

@Component({
  selector: 'app-dashboard',
  imports: [Filter, ProfileCard, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  handleApplyFilters(filters: any) {
    console.log('Applied filters:', filters);
    // Later you can implement filtering logic here
  }
  
  handleClearFilters() {
    console.log('Filters cleared');
  }
  
}
