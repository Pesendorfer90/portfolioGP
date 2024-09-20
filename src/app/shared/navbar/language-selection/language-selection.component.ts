import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languages } from '../../config/data';
import { TranslationService } from '../../../service/translation.service';

@Component({
  selector: 'app-language-selection',
  standalone: true,
  imports: [],
  template: `
    <button (click)="changeLang('en')">English</button>
    <button (click)="changeLang('de')">Deutsch</button>
  `,
  styleUrl: './language-selection.component.scss'
})
export class LanguageSelectionComponent {
  languages = languages;

  constructor(private translate: TranslateService,
    private translationService: TranslationService
  ) {
    translate.setDefaultLang('en');
  }

  changeLang(lang: string) {
     this.translationService.changeLang(lang);
   }
}
