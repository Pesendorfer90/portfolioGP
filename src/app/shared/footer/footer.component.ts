import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationStates } from '../../models/animation-states'
import { ScrollbarService } from '../../service/scrollbar.service';
import { ScrollToService } from '../../service/scroll-to.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  linkNames: string[] = ["link1", "link2", "link3"];
  linkAnimationStates: { [key: string]: AnimationStates } = {}

  constructor(
    public scrollbarService: ScrollbarService, 
    private scrollToService: ScrollToService) {
    this.initializeLinks(this.linkNames);
  }

  initializeLinks(linkNames: string[]) {
    linkNames.forEach(linkName => {
      this.linkAnimationStates[linkName] = {
        enter: false,
        leave: false,
        down: false
      };
    });
  }

  onMouseEnter(linkId: string) {
    this.linkAnimationStates[linkId] = { enter: true, leave: false, down: false };
  }

  onMouseOut(linkId: string) {
    this.linkAnimationStates[linkId] = { enter: false, leave: true, down: false };
  }

  scrollToArea(link: string) {
    this.scrollToService.scrollToElement(link);
  }
}
