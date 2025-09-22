import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-service-under-development',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './serviceUnderDevlopement.html',
  styleUrl: './serviceUnderDevlopement.scss'
})
export class ServiceUnderDevelopmentComponent {

  constructor() { }

  goHome(): void {
    window.location.href = '/';
  }
}
