import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandinPageComponent } from './landin-page/landin-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from "./contact/contact.component";
import { ScrollbarService } from '../service/scrollbar.service';
import { ArrowComponent } from "./arrow/arrow.component";

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
    ArrowComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

  constructor(public scrollbarService: ScrollbarService) { }

  
}