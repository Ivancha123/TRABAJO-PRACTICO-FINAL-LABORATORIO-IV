import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  alertStatus: Boolean = true;
  alertMessage: string = "I'm a Alert, Look at me!!";

  onSubmit() {

  }

  setAlert(mesagge: string) {
    this.alertStatus = true;
    this.alertMessage = mesagge;
  }

  clearAlert() {
    this.alertStatus = false;
    this.alertMessage = "";
  }
}
