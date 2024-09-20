import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AnimationStates } from '../../models/animation-states'
import { RouterModule } from '@angular/router';
import { ScrollToService } from '../../service/scroll-to.service';
import { HttpClient } from '@angular/common/http';
import { VisibilityCheckService } from '../../service/visibility-check.service';
import { MessageInfos } from '../../models/message-infos';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '../../service/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isHovered: boolean = false;
  nameFocus: boolean = false;
  emailFocus: boolean = false;
  messageFocus: boolean = false;
  linkAnimationStates: { [key: string]: AnimationStates } = {};
  privatPolicy: boolean = false;

  http = inject(HttpClient);
  mailTest = false;

  @ViewChild('contact', { static: false })
  monitoredDiv?: ElementRef<HTMLDivElement>;
  @Output() contactElement = new EventEmitter<boolean>();

  contactData: { [key: string]: MessageInfos } = {};

  /**
   * @param {ScrollToService} scrollToService - Service used to handle scrolling to specific elements.
   * @param {VisibilityCheckService} visibilityCheckService - Service used to check if elements are visible in the viewport.
   * 
   * The constructor initializes the animation state for the 'arrowUp' link with default values.
   */
  constructor(private scrollToService: ScrollToService,
    public visibilityCheckService: VisibilityCheckService,
    private toastr:ToastrService,
    public translate: TranslationService
  ) {
    this.linkAnimationStates['arrowUp'] = {
      enter: false,
      leave: false,
      down: false,
    };
  }

  /**
   * Configuration object for sending POST requests.
   * 
   * @property {string} endPoint - The URL endpoint to which the POST request is sent.
   * @property {Function} body - A function that takes a payload and converts it into a JSON string.
   * @property {Object} options - The options for the HTTP request, including headers and response type.
   *   @property {Object} options.headers - Contains the headers for the HTTP request.
   *   @property {string} options.headers['Content-Type'] - The content type of the request (text/plain).
   *   @property {string} options.headers.responseType - The expected response type (text).
   */
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

  /**
   * Handles form submission by sending a POST request if the form is valid.
   * 
   * This method checks if the form has been submitted and is valid. If the form is valid and the mail test flag is not active, 
   * it sends a POST request with the contact data. Upon successful submission, the form is reset.
   * 
   * @param {NgForm} ngForm - The form object containing form data and validation status.
   */
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
          complete: () => {
            console.info('send post complete');
            this.toastr.success('Message sent.');
            // Hier eine sendebestätigung einfügen
          }
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }

  /**
   * Handles the mouse enter event for a link, updating its animation state.
   * It updates the animation state for the given `linkId` by setting the `enter` state to `true`, 
   * and resetting the `leave` and `down` states to `false`.
   *
   * @param {string} linkId - The identifier of the link whose animation state is being updated.
   */
  onMouseEnter() {
    this.linkAnimationStates['arrowUp'] = { enter: true, leave: false, down: false };
  }

  /**
   * Handles the mouse out event for a link, updating its animation state.
   * It updates the animation state for the given `linkId` by setting the `leave` state to `true`, 
   * and resetting the `enter` and `down` states to `false`.
   *
   * @param {string} linkId - The identifier of the link whose animation state is being updated.
   */
  onMouseOut() {
    this.linkAnimationStates['arrowUp'] = { enter: false, leave: true, down: false };
  }

  /**
   * This method triggers the scrolling to a specific element identified by the given link.
   *
   * @param {string} link - The identifier (e.g., ID or selector) of the element to scroll to.
   */
  scrollToArea(link: string) {
    this.scrollToService.scrollToElement(link);
  }

  /** 
   * @HostListener scroll - Listens to the window scroll event.
   * @HostListener resize - Listens to the window resize event.
   * This method checks if the monitored element is scrolled into view and emits the result.
   */
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onWindowChange() {
    this.contactElement.emit(this.visibilityCheckService.isScrolledIntoView(this.monitoredDiv!));
  }
}
