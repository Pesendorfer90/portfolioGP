import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { VisibilityCheckService } from '../../service/visibility-check.service';
import { TouchDetectionService } from '../../service/touch-detection.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
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
      gitLink: 'https://github.com/Pesendorfer90/join',
      projectLink: 'http://gerald-pesendorfer.at/join/login.html'
    },
    {
      image: './assets/img/projects/pokedex.PNG',
      name: 'Pokédex',
      techStack: 'JavaScript | HTML | CSS | Api',
      description: 'Based on the PokéAPI a simple library that provides and catalogues pokemon information.',
      gitLink: 'https://github.com/Pesendorfer90/Pokedex',
      projectLink: 'http://gerald-pesendorfer.at/Pokedex/index.html'
    },
    {
      image: './assets/img/projects/under-construction.jpg',
      name: '',
      techStack: '',
      description: '',
      gitLink: '',
      projectLink: ''
    },
    {
      image: './assets/img/projects/under-construction.jpg',
      name: '',
      techStack: '',
      description: '',
      gitLink: '',
      projectLink: ''
    }
  ];

  @ViewChild('project', { static: false })
  monitoredDiv?: ElementRef<HTMLDivElement>;
  @Output() projectElement = new EventEmitter<boolean>();

  @ViewChildren('imageTrigger') projects!: QueryList<ElementRef>;
  monitoredImg1?: ElementRef<HTMLDivElement>;
  project1 = new EventEmitter<boolean>();
  project1Visible: boolean = false;

  monitoredImg2?: ElementRef<HTMLDivElement>;
  project2 = new EventEmitter<boolean>();
  project2Visible: boolean = false;

  monitoredImg3?: ElementRef<HTMLDivElement>;
  project3 = new EventEmitter<boolean>();
  project3Visible: boolean = false;

  monitoredImg4?: ElementRef<HTMLDivElement>;
  project4 = new EventEmitter<boolean>();
  project4Visible: boolean = false;

  monitoredImg5?: ElementRef<HTMLDivElement>;
  project5 = new EventEmitter<boolean>();
  project5Visible: boolean = false;

  isTouchDevice: boolean = false;


  constructor(public visibilityCheckService: VisibilityCheckService,
    private touchDetectionService: TouchDetectionService
  ) { }

  ngOnInit(): void {
    this.isTouchDevice = this.touchDetectionService.isTouchDevice();
    console.log(this.isTouchDevice, "touch");
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])

  onWindowChange() {
    this.projectElement.emit(this.visibilityCheckService.isScrolledIntoView(this.monitoredDiv))
    this.projects.forEach((id, index) => {
      if (index == 0) {
        const visible = this.visibilityCheckService.isScrolledIntoView(id);
        this.project1.emit(visible);
        this.project1.subscribe((visible: boolean) => {
          this.project1Visible = visible;
        });
      } if (index == 1) {
        const visible = this.visibilityCheckService.isScrolledIntoView(id);
        this.project2.emit(visible);
        this.project2.subscribe((visible: boolean) => {
          this.project2Visible = visible;
        });
      } if (index == 2) {
        const visible = this.visibilityCheckService.isScrolledIntoView(id);
        this.project3.emit(visible);
        this.project3.subscribe((visible: boolean) => {
          this.project3Visible = visible;
        });
      } if (index == 3) {
        const visible = this.visibilityCheckService.isScrolledIntoView(id);
        this.project4.emit(visible);
        this.project4.subscribe((visible: boolean) => {
          this.project4Visible = visible;
        });
      } if (index == 4) {
        const visible = this.visibilityCheckService.isScrolledIntoView(id);
        this.project5.emit(visible);
        this.project5.subscribe((visible: boolean) => {
          this.project5Visible = visible;
        });
      } 
    });
  }
}
