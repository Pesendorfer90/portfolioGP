import { Component } from '@angular/core';
import { languages } from '../../config/data';
import { TranslationService } from '../../../service/translation.service';

@Component({
  selector: 'app-language-selection',
  standalone: true,
  imports: [  ],
  template: `
  @if (this.translationService.language == 'de') {
    <img (click)="changeLang('en')" src="assets/img/language/english.png">
  } @if (this.translationService.language == 'en') {
    <img (click)="changeLang('de')" src="assets/img/language/german.png">
  }
  `,
  styleUrl: './language-selection.component.scss'
})
export class LanguageSelectionComponent {
  languages = languages;
  language = '';

  constructor(public translationService: TranslationService) {    
    this.translationService.getLang();
    this.language = this.translationService.language;
  }

  changeLang(lang: string) {
     this.translationService.changeLang(lang);
     this.translationService.language = lang;
   }
}
