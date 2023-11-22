import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes("/administrator?tab=tickets.list")) this.selection = [true, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=tickets.add")) this.selection = [false, true];
        else this.selection = [true, false];
      }
    });
    
  }

  selection = [true, false];
}