import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  mobileMenuOpen = false;

  protected navbarMenus = [
    { path: 'landing', label: 'Home' },
    { path: 'login', label: 'Login' },
    { path: 'register', label: 'Register' },
    { path: 'profile', label: 'Profile' },
    { path: 'dashboard', label: 'Dashboard' },
  ];
}
