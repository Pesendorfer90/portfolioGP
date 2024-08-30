import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationStates } from '../../models/animation-states'
import { ScrollbarService } from '../../service/scrollbar.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  linkNames = ["link1", "link2", "link3"];

  constructor(public scrollbarService: ScrollbarService) {
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

  linkAnimationStates: { [key: string]: AnimationStates } = {}
  // linkAnimationStates: { [key: string]: { enter: boolean, leave: boolean } } = {};

  onMouseEnter(linkId: string) {
    this.linkAnimationStates[linkId] = { enter: true, leave: false, down: false };
  }

  onMouseOut(linkId: string) {
    this.linkAnimationStates[linkId] = { enter: false, leave: true, down: false };
  }

  // scrollToArea(link: string) {
  //   scrollToElement(link);
  // }

}
