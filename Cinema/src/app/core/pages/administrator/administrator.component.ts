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
        if (event.urlAfterRedirects.includes("/administrator?tab=functions")) this.selection = [true, false, false, false, false, false, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=movies")) this.selection = [false, true, false, false, false, false, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=combos")) this.selection = [false, false, true, false, false, false, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=tickets")) this.selection = [false, false, false, true, false, false, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=users")) this.selection = [false, false, false, false, true, false, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=rooms")) this.selection = [false, false, false, false, false, true, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=seats")) this.selection = [false, false, false, false, false, false, true];
        else this.selection = [true, false, false, false, false, false, false];
      }
    });
  }
  selection = [true, false, false, false, false, false, false];
}
