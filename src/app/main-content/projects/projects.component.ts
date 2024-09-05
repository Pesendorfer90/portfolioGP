import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { VisibilityCheckService } from '../../service/visibility-check.service';
import { TouchDetectionService } from '../../service/touch-detection.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
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

  @ViewChildren('test') images!: QueryList<ElementRef>;
  monitoredImg1?: ElementRef<HTMLDivElement>;
  @Output() img1 = new EventEmitter<boolean>();


  // @ViewChild('test', { static: false })
  // monitoredImg1?: ElementRef<ElementRef>;
  // @Output() img1 = new EventEmitter<boolean>();

  // @ViewChild('project2', { static: false })
  // monitoredImg2?: ElementRef<HTMLDivElement>;
  // @Output() img2 = new EventEmitter<boolean>();

  // @ViewChild('project3', { static: false })
  // monitoredImg3?: ElementRef<HTMLDivElement>;
  // @Output() img3 = new EventEmitter<boolean>();
  
  // @ViewChild('project4', { static: false })
  // monitoredImg4?: ElementRef<HTMLDivElement>;
  // @Output() img4 = new EventEmitter<boolean>();
  
  // @ViewChild('project5', { static: false })
  // monitoredImg5?: ElementRef<HTMLDivElement>;
  // @Output() img5 = new EventEmitter<boolean>();

  // monitoringList: string[] = ["this.project", "this.monitoredImg1", "this.monitoredImg2", "this.monitoredImg3", "this.monitoredImg4", "this.monitoredImg5"]


  constructor(public visibilityCheckService: VisibilityCheckService) { }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])

  onWindowChange() {
    this.projectElement.emit(this.visibilityCheckService.isScrolledIntoView(this.monitoredDiv))
    // console.log(this.visibilityCheckService.isScrolledIntoView(this.monitoredDiv));

    this.images.forEach((img, index) => {
      // console.log('Image:', img.nativeElement.getBoundingClientRect(), 'Index:', index + 1);
      this.img1.emit(this.visibilityCheckService.isScrolledIntoView(img));
      console.log(this.img1.emit(this.visibilityCheckService.isScrolledIntoView(img)));
      console.log(img, index);
    });
  }
}
