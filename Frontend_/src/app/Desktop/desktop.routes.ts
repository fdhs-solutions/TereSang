import { Routes } from '@angular/router';
import { LandingPage } from './components/landing/landing-page/landing-page';
import { LoginComponent } from './components/authentication/login/login';
import { PageNotFoundComponent } from '../common/components/pageNotFound/pageNotFound';
import { ServiceUnderDevelopmentComponent } from '../common/components/followBack/serviceUnderDevlopement';

export const desktopRoutes: Routes = [
  { path: '', component: LandingPage },
  { path: 'landing', component: LandingPage },
  { path: 'login', component: LoginComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: 'under-development', component: ServiceUnderDevelopmentComponent },
  // Example routes for features under development
  { path: 'profile', component: ServiceUnderDevelopmentComponent },
  { path: 'search', component: ServiceUnderDevelopmentComponent },
  { path: 'messages', component: ServiceUnderDevelopmentComponent },
  { path: '**', component: PageNotFoundComponent }
];
