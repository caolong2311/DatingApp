import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { CommonModule } from '@angular/common';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      jwtInterceptor,
      loadingInterceptor
    ])),
    provideAnimations(),
    importProvidersFrom(FormsModule),
    importProvidersFrom(CommonModule),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
      progressBar: true
    }),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
