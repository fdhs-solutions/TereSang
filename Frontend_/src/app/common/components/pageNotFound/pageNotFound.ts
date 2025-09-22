import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pageNotFound.html',
  styleUrl: './pageNotFound.scss'
})
export class PageNotFoundComponent {

  constructor() { }

  goHome(): void {
    window.location.href = '/';
  }
}
