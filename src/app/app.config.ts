import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { tokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, spinnerInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom([ɵBrowserAnimationBuilder]),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
};
