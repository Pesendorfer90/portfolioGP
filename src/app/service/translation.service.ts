import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLang = 'en';
  language = '';

  /**
 * Initializes the component with translation settings and platform-specific checks.
 *
 * @param {TranslateService} translateService - The service used for handling translations.
 * @param {Object} platformId - The current platform ID, used to determine if the code is running in a browser environment.
 *
 * The constructor performs the following tasks:
 * - Checks if the code is running in a browser environment using `isPlatformBrowser`.
 *   - If true, it attempts to retrieve the saved language preference from `localStorage` (`lng`).
 *   - If a saved language is found, it sets it as the `defaultLang`.
 *   - Sets the default language for the translation service using `translateService.setDefaultLang`.
 *   - Activates the language using `translateService.use` with the selected or default language.
 */
  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
    }
  }

  /**
 * Changes the application's language and saves the selection to localStorage.
 *
 * @param {string} lang - The language code to switch to (e.g., 'en', 'fr').
 *
 * The function changes the current language used by the `TranslateService` to the specified `lang`.
 * If the code is running in a browser environment (`isPlatformBrowser`), it also saves the selected
 * language in `localStorage` under the key 'lng' for persistence across sessions.
 */
  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
  }

  /**
 * Retrieves the saved language from localStorage or sets it to the default language if not found.
 *
 * The function checks if a language is stored in `localStorage` under the key 'lng'.
 * - If a language is found, it sets `this.language` to the stored value.
 * - If no language is found, it defaults `this.language` to `this.defaultLang`.
 */
  getLang() {
    let storage = localStorage.getItem('lng');
    if (!storage) {
      this.language = this.defaultLang
    } else {      
      this.language = storage;
    }
   }
}
