import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { AnimationStates } from '../../models/animation-states'
import { ScrollbarService } from '../../service/scrollbar.service';
import { RouterModule } from '@angular/router';
import { LanguageSelectionComponent } from "./language-selection/language-selection.component";
import { TranslationService } from '../../service/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSelectionComponent, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  menu: boolean = false;
  burgerIndex: number = 1;
  isAnimating: boolean = false;
  linkAnimationStates: { [key: string]: AnimationStates } = {}
  linkNames = ["link1", "link2", "link3"];


  constructor(
    public scrollbarService: ScrollbarService,
    public translate: TranslationService) {
    this.initializeLinks(this.linkNames);
  }

  /** 
   * In this method, a `window.onload` event handler is set up to check the status of the scrollbar
   * once the window is fully loaded. It uses the `scrollbarService` to determine the scrollbar's visibility.
   */
  ngAfterViewInit(): void {
    window.onload = () => {
      this.scrollbarService.scrollbarStatus();
    }
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
   * This method checks is `isAnimating` is true or false.
   * If `isAnimating` is `false`, the method starts following functions.
   * 
   */
  navMenu() {
    if (!this.isAnimating) {
      this.setVariables();
      this.animateBurger();
      this.changeScroll();
    }
  }

  /** 
   * This method checks the value of the `burgerIndex` property to determine whether the burger menu icon should be opened or closed. 
   */
  animateBurger() {
    if (this.burgerIndex == 1) {
      this.openBurger();
    } else {
      this.closeBurger();
    }
  }

  /** 
   * Adjusts the page's scroll behavior based on the menu state.
   */
  changeScroll() {
    if (this.menu) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  /** 
   * Toggles the menu state and sets the animation flag.
   */
  setVariables() {
    this.isAnimating = true;
    this.menu = !this.menu;
  }

  /** 
   * This method starts an animation interval that increments the `burgerIndex` property until it reaches a value of 5,
   * indicating that the burger menu is fully opened. The interval increments `burgerIndex` every 56 milliseconds.
   * Once `burgerIndex` reaches 5, the interval is cleared, and the `isAnimating` flag is set to `false`, indicating that the animation has finished.
   */
  openBurger() {
    const interval = setInterval(() => {
      this.burgerIndex < 5 ? this.burgerIndex++ : (clearInterval(interval), this.isAnimating = false);
    }, 56);
  }

  /** 
   * This method starts an animation interval that decrements the `burgerIndex` property until it reaches a value of 1,
   * indicating that the burger menu is fully closed. The interval decrements `burgerIndex` every 56 milliseconds.
   * Once `burgerIndex` reaches 1, the interval is cleared, and the `isAnimating` flag is set to `false`, signaling that the animation has completed.
   */
  closeBurger() {
    const interval = setInterval(() => {
      this.burgerIndex > 1 ? this.burgerIndex-- : (clearInterval(interval), this.isAnimating = false);
    }, 56);
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

  /**
   * Checks if the menu is present and triggers the navigation menu action if it exists.
   *
   * This function checks whether the `menu` property is defined (`true`). If the menu exists,
   * it calls the `navMenu()` function to perform the related navigation menu actions.
   */
  checkMenu() {
    if (this.menu) {
      this.navMenu()
    }
  }
}