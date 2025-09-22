import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { mobileRoutes } from './Mobile/mobile.routes';
import { desktopRoutes } from './Desktop/desktop.routes';

// Decide which routes to load based on screen width
const isMobile = window.innerWidth < 768; // You can adjust breakpoint as needed
const routes = isMobile ? mobileRoutes : desktopRoutes;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
