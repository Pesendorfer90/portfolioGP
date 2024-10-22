import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../service/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  constructor(public translate: TranslationService) { }
}
