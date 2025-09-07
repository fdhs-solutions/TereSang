import { Routes } from '@angular/router';
import { LandingPage } from './components/landing/landing-page/landing-page';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'landing', component: LandingPage },
  { path: '**', redirectTo: '' }
];
