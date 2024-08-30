import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimationStates } from '../../models/animation-states'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isHovered: boolean = false;
  nameFocus: boolean = false;
  emailFocus: boolean = false;
  messageFocus: boolean = false;
  linkAnimationStates: { [key: string]: AnimationStates } = {};
  // http = inject(HttpClient);
  // mailTest = false;

  contactData = {
    name: "",
    email: "",
    message: "",
    privatPolicy: false,
  }

  constructor() {
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

  // onSubmit(ngForm: NgForm) {
  //   if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
  //     this.http.post(this.post.endPoint, this.post.body(this.contactData))
  //       .subscribe({
  //         next: (response) => {

  //           ngForm.resetForm();
  //         },
  //         error: (error) => {
  //           console.error(error);
  //         },
  //         complete: () => console.info('send post complete'),
  //       });
  //   } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) { 
  //     ngForm.resetForm();
  //   }
  // }

  onMouseEnter() {
    this.linkAnimationStates['arrowUp'] = { enter: true, leave: false, down: false };
  }

  onMouseOut() {
    this.linkAnimationStates['arrowUp'] = { enter: false, leave: true, down: false };
  }

  // scrollToArea(link: string) {
  //   scrollToElement(link);
  // }

}
