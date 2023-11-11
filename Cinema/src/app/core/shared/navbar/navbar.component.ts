import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("Evento: ", event);
        switch (event.urlAfterRedirects) {
          case "/":
            this.selection = [true, false, false, false, false, false, false];
            break;
          case "/movies":
            this.selection = [false, true, false, false, false, false, false];
            break;
          case "/prices":
            this.selection = [false, false, true, false, false, false, false];
            break;
          case "/coming-soon":
            this.selection = [false, false, false, false, true, false, false];
            break;
          case "/contact-us":
            this.selection = [false, false, false, false, false, true, false];
            break;
          case "/about-us":
            this.selection = [false, false, false, false, false, false, true];
            break;
          case "/home":
            this.selection = [true, false, false, false, false, false, false];
            break;
          default:
            this.selection = [false, false, false, false, false, false, false];
            break;
        }
      }
    });

  }

  selection = [false, false, false, false, false, false];

  navigate(direccion: string) {
    this.router.navigate([direccion]);
  }
}