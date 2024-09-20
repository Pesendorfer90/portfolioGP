import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollToService } from '../../service/scroll-to.service';
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

  constructor(private scrollToService: ScrollToService,
    public translate: TranslationService
  ) { }

  /**
   * This method triggers the scrolling to a specific element identified by the given link.
   *
   * @param {string} link - The identifier (e.g., ID or selector) of the element to scroll to.
   */
  scrollToArea(link: string) {
    this.scrollToService.scrollToElement(link);
  }
}
