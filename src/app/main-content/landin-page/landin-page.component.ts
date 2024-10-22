import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../service/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landin-page',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './landin-page.component.html',
  styleUrl: './landin-page.component.scss'
})
export class LandinPageComponent {
  constructor(public translate: TranslationService) { }
}
