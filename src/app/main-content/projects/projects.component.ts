import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { VisibilityCheckService } from '../../service/visibility-check.service';
import { TouchDetectionService } from '../../service/touch-detection.service';
import { TranslationService } from '../../service/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  items = [
    {
      image: './assets/img/projects/epl.png',
      name: 'Pollo Loco',
      techStack: 'JavaScript | HTML | CSS',
      description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      gitLink: 'https://github.com/Pesendorfer90/el_pollo_loco',
      projectLink: 'http://gerald-pesendorfer.at/el_pollo_loco/index.html'
    },
    {
      image: './assets/img/projects/join.PNG',
      name: 'Join',
      techStack: 'Angular | TypeScript | HTML | CSS | Firebase',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      gitLink: 'https://github.com/Pesendorfer90/Join-v1.1',
      projectLink: 'http://gerald-pesendorfer.at/join/login.html'
    },
    {
      image: './assets/img/projects/pokedex.PNG',
      name: 'Pokédex',
      techStack: 'JavaScript | HTML | CSS | Api',
      description: 'Based on the PokéAPI a simple library that provides and catalogues pokemon information.',
      gitLink: 'https://github.com/Pesendorfer90/Pokedex',
      projectLink: 'http://gerald-pesendorfer.at/Pokedex/index.html'
    }
  ];


  @ViewChild('project', { static: false })
  monitoredDiv?: ElementRef<HTMLDivElement>;
  @Output() projectElement = new EventEmitter<boolean>();

  @ViewChildren('hoverTrigger') projects!: QueryList<ElementRef>;

  projectVisibility: boolean[] = [];
  projectEvents: EventEmitter<boolean>[] = [];

  isTouchDevice: boolean = false;


  constructor(public visibilityCheckService: VisibilityCheckService,
    private touchDetectionService: TouchDetectionService,
    public translate: TranslationService
  ) { }

  /** 
   * This method sets up initial project events, visibility states, and detects if the device is a touch device.
   * - Initializes an array of EventEmitters for project visibility.
   * - Sets the initial project visibility to false for all projects.
   * - Detects if the current device is a touch device.
   */
  ngOnInit() {
    this.projectEvents = Array(5).fill(null).map(() => new EventEmitter<boolean>());
    this.projectVisibility = Array(5).fill(false);
    this.isTouchDevice = this.touchDetectionService.isTouchDevice();
  }

  /** 
   * Checks and emits the visibility status of the monitored element and project elements.
   * This method evaluates whether the monitored element and each project are scrolled into view,
   * then emits the visibility status for each. It also updates the internal project visibility state.
   * 
   * @HostListener scroll - Listens to the window scroll event.
   * @HostListener resize - Listens to the window resize event.
   */
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onWindowChange() {
    this.projectElement.emit(this.visibilityCheckService.isScrolledIntoView(this.monitoredDiv!));

    this.projects.forEach((id, index) => {
      const visible = this.visibilityCheckService.isScrolledIntoView(id);
      if (this.projectEvents[index]) {
        this.projectEvents[index].emit(visible);
        this.projectEvents[index].subscribe((visible: boolean) => {
          this.projectVisibility[index] = visible;
        });
      }
    });
  }

}
