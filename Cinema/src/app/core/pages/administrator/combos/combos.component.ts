import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes("/administrator?tab=combos.list")) this.selection = [true, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=combos.add")) this.selection = [false, true];
        else this.selection = [true, false];
      }
    });
    
  }

  selection = [true, false];
}