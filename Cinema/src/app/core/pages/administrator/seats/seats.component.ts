import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes("/administrator?tab=seats.add")) this.selection = [true, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=seats.list")) this.selection = [false, true];
        else this.selection = [true, false];
      }
    });
    
  }
  
  selection = [true, false];
}
