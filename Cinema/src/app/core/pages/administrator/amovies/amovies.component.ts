import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-amovies',
  templateUrl: './amovies.component.html',
  styleUrls: ['./amovies.component.scss']
})
export class AmoviesComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes("/administrator?tab=movies.list")) this.selection = [true, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=movies.add")) this.selection = [false, true];
        else this.selection = [true, false];
      }
    });
    
  }

  selection = [true, false];
}
