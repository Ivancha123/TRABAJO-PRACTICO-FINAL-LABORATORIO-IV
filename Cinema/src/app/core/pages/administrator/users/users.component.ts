import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes("/administrator?tab=users.list")) this.selection = [true, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=users.add")) this.selection = [false, true];
        else this.selection = [true, false];
      }
    });
    
  }

  selection = [true, false];
}