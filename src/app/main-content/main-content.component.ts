import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandinPageComponent } from './landin-page/landin-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from "./contact/contact.component";
import { ScrollbarService } from '../service/scrollbar.service';
import { ArrowComponent } from "./arrow/arrow.component";
import { VisibilityCheckService } from '../service/visibility-check.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    LandinPageComponent,
    AboutMeComponent,
    MySkillsComponent,
    ProjectsComponent,
    ContactComponent,
    ContactComponent,
    ArrowComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  @ViewChild('testDiv', { static: false })
  testDiv!: ElementRef<HTMLDivElement>;
  isTestDivScrolledIntoView: boolean = false;

  constructor(public scrollbarService: ScrollbarService,
    public visibilityCheckService: VisibilityCheckService
  ) { }


  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  
  onWindowChange() {
    this.isTestDivScrolledIntoView = this.visibilityCheckService.isScrolledIntoView(this.testDiv)
    // this.visibilityCheckService.isScrolledIntoView(this.testDiv)
  }
  


}

// <app-my-skills #testDiv></app-my-skills> wird von der funktion nicht erkannt