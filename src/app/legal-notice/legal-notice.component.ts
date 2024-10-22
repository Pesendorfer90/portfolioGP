import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../service/translation.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [ TranslateModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  constructor(public translate: TranslationService) { }
}
