import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { VisibilityCheckService } from '../../service/visibility-check.service';

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


  constructor(public visibilityCheckService: VisibilityCheckService) { }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])

  onWindowChange() {
    this.projectElement.emit(this.visibilityCheckService.isScrolledIntoView(this.monitoredDiv))
  }
}
