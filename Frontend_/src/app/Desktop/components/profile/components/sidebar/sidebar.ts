import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
protected  sidebarContent = [
    'Primary User Details',
    'Family Details',
    'Personal Details',
    'Lifestyle & Education',
    'Partner Preferences'
  ];
  
  protected selectedTab = 0;

  protected selectTab(index: number) {
    this.selectedTab = index;
  }
  
  
}
