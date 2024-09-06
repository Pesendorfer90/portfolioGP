import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { AnimationStates } from '../../models/animation-states'
import { ScrollbarService } from '../../service/scrollbar.service';
import { ScrollToService } from '../../service/scroll-to.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    private scrollToService: ScrollToService,
    private router: Router) {
    this.initializeLinks(this.linkNames);
  }

  ngAfterViewInit(): void {
    window.onload = () => {
      this.scrollbarService.scrollbarStatus();
    }
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

  scrollToArea(link: string) {
    if (["aboutMe", "mySkills", "portfolio", "contactSection", "headerUp"].includes(link)) {
      if (this.menu) {
        this.navMenu();
      }
    }
    this.scrollToService.scrollToElement(link);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          this.scrollToService.scrollToElement(tree.fragment);
        }
      }
    });
  }

  navMenu() {
    if (!this.isAnimating) {
      this.setVariables();
      this.animateBurger();
      this.changeScroll();
    }
  }

  animateBurger() {
    if (this.burgerIndex == 1) {
      this.openBurger();
    } else {
      this.closeBurger();
    }
  }

  changeScroll() {
    if (this.menu) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  setVariables() {
    this.isAnimating = true;
    this.menu = !this.menu;
  }

  openBurger() {
    const interval = setInterval(() => {
      this.burgerIndex < 5 ? this.burgerIndex++ : (clearInterval(interval), this.isAnimating = false);
    }, 56);
  }

  closeBurger() {
    const interval = setInterval(() => {
      this.burgerIndex > 1 ? this.burgerIndex-- : (clearInterval(interval), this.isAnimating = false);
    }, 56);
  }

  onMouseEnter(linkId: string) {
    this.linkAnimationStates[linkId] = { enter: true, leave: false, down: false };
  }

  onMouseOut(linkId: string) {
    this.linkAnimationStates[linkId] = { enter: false, leave: true, down: false };
  }
}