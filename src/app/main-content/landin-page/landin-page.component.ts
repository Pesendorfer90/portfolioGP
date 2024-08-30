import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollToService } from '../../service/scroll-to.service';

@Component({
  selector: 'app-landin-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landin-page.component.html',
  styleUrl: './landin-page.component.scss'
})
export class LandinPageComponent {

  constructor(private scrollToService: ScrollToService) { }

  scrollToArea(link: string) {
    this.scrollToService.scrollToElement(link)
  }
}
