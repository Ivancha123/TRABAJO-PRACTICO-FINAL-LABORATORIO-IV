import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("Evento: ", event);
        switch (event.urlAfterRedirects) {
          case "/administrator?tab=functions":
            this.selection = [true, false, false, false, false, false];
            break;
          case "/administrator?tab=movies":
            this.selection = [false, true, false, false, false, false];
            break;
          case "/administrator?tab=combos":
            this.selection = [false, false, true, false, false, false];
            break;
          case "/administrator?tab=statistics":
            this.selection = [false, false, false, true, false, false];
            break;
          case "/administrator?tab=tickets":
            this.selection = [false, false, false, false, true, false];
            break;
          case "/administrator?tab=users":
            this.selection = [false, false, false, false, false, true];
            break;
          default:
            this.selection = [true, false, false, false, false, false];
            break;
        }
      }
      console.log(this.selection);
    });

  }
  selection = [true, false, false, false, false, false];
}
