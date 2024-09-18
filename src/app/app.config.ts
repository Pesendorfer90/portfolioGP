import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule), // Notwendig für ngx-toastr
    importProvidersFrom(ToastrModule.forRoot({
      timeOut: 10000, // 10 Sekunden Timeout für alle Toasts
      positionClass: 'toast-bottom-center', // Positionierung nach Wunsch
      preventDuplicates: true,
    }))
  ]
};
