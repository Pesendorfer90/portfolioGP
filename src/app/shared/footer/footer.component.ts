import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationStates } from '../../models/animation-states'
import { ScrollbarService } from '../../service/scrollbar.service';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../service/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  linkNames: string[] = ["link1", "link2", "link3"];
  linkAnimationStates: { [key: string]: AnimationStates } = {}

  constructor(
    public scrollbarService: ScrollbarService,
    public translate: TranslationService) {
    this.initializeLinks(this.linkNames);
  }

  /**
    * This method iterates over an array of link names and sets up the initial animation state for each link.
    * The animation state for each link includes three properties: `enter`, `leave`, and `down`, all initialized to `false`.
    *
    * @param {string[]} linkNames- An array of link names for which the animation states will be initialized.
    * @property {Object.<string, AnimationStates>} linkAnimationStates - An object where the key is the link name and the value is the animation state. 
    * Each state contains three boolean properties: `enter`, `leave`, and `down`.
    */
  initializeLinks(linkNames: string[]) {
    linkNames.forEach(linkName => {
      this.linkAnimationStates[linkName] = {
        enter: false,
        leave: false,
        down: false
      };
    });
  }

  /**
   * Handles the mouse enter event for a link, updating its animation state.
   * It updates the animation state for the given `linkId` by setting the `enter` state to `true`, 
   * and resetting the `leave` and `down` states to `false`.
   *
   * @param {string} linkId - The identifier of the link whose animation state is being updated.
   */
  onMouseEnter(linkId: string) {
    this.linkAnimationStates[linkId] = { enter: true, leave: false, down: false };
  }

  /**
   * Handles the mouse out event for a link, updating its animation state.
   * It updates the animation state for the given `linkId` by setting the `leave` state to `true`, 
   * and resetting the `enter` and `down` states to `false`.
   *
   * @param {string} linkId - The identifier of the link whose animation state is being updated.
   */
  onMouseOut(linkId: string) {
    this.linkAnimationStates[linkId] = { enter: false, leave: true, down: false };
  }
}
