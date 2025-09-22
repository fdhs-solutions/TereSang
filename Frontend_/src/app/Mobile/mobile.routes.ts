import { Routes } from '@angular/router';
import { ServiceUnderDevelopmentComponent } from '../common/components/followBack/serviceUnderDevlopement';
import { PageNotFoundComponent } from '../common/components/pageNotFound/pageNotFound';

export const mobileRoutes: Routes = [
  { path: '', redirectTo: 'under-development', pathMatch: 'full' },

  { path: 'under-development', component: ServiceUnderDevelopmentComponent },

  { path: '**', component: PageNotFoundComponent },
];
