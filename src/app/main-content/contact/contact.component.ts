import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AnimationStates } from '../../models/animation-states'
import { RouterModule } from '@angular/router';
import { ScrollToService } from '../../service/scroll-to.service';
import { HttpClient } from '@angular/common/http';
import { VisibilityCheckService } from '../../service/visibility-check.service';
import { MessageInfos } from '../../models/message-infos';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isHovered: boolean = false;
  nameFocus: boolean = false;
  emailFocus: boolean = false;
  messageFocus: boolean = false;
  linkAnimationStates: { [key: string]: AnimationStates } = {};

  http = inject(HttpClient);
  mailTest = false;

  @ViewChild('contact', { static: false })
  monitoredDiv?: ElementRef<HTMLDivElement>;
  @Output() contactElement = new EventEmitter<boolean>();

  contactData: { [key: string]: MessageInfos} = {};

  constructor(private scrollToService: ScrollToService,
    public visibilityCheckService: VisibilityCheckService
  ) {
    this.linkAnimationStates['arrowUp'] = {
      enter: false,
      leave: false,
      down: false
    };
  }


  post = {
    endPoint: 'https://gerald-pesendorfer.at/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {

            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) { 
      console.log(this.contactData);
      
      ngForm.resetForm();
    }
  }

  onMouseEnter() {
    this.linkAnimationStates['arrowUp'] = { enter: true, leave: false, down: false };
  }

  onMouseOut() {
    this.linkAnimationStates['arrowUp'] = { enter: false, leave: true, down: false };
  }

  scrollToArea(link: string) {
    this.scrollToService.scrollToElement(link);
  }


  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onWindowChange() {
    this.contactElement.emit(this.visibilityCheckService.isScrolledIntoView(this.monitoredDiv));    
  }

}
