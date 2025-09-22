import { Routes } from '@angular/router';
import { ServiceUnderDevelopmentComponent } from '../common/components/followBack/serviceUnderDevlopement';
import { PageNotFoundComponent } from '../common/components/pageNotFound/pageNotFound';
import { LandingPage } from './components/landing/landing-page/landing-page';

export const mobileRoutes: Routes = [
  { path: '', redirectTo: 'under-development', pathMatch: 'full' },
  { path: 'landing', component: LandingPage },
  { path: '404', component: PageNotFoundComponent },
  { path: 'under-development', component: ServiceUnderDevelopmentComponent },
  // Example routes for features under development
  { path: 'profile', component: ServiceUnderDevelopmentComponent },
  { path: 'search', component: ServiceUnderDevelopmentComponent },
  { path: 'messages', component: ServiceUnderDevelopmentComponent },
  { path: '**', component: PageNotFoundComponent },
];
