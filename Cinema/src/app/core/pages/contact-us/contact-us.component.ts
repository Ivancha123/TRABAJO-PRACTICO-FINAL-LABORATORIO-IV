import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_t51q9cr', 'template_eu4zk86', e.target as HTMLFormElement, 'yT72h64f6dO0r9nD2')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
}
