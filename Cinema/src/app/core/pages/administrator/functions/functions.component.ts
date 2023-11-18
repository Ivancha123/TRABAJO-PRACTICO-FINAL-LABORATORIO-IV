import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss']
})
export class FunctionsComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes("/administrator?tab=functions.list")) this.selection = [true, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=functions.add")) this.selection = [false, true];
        else this.selection = [true, false];
      }
    });
    
  }
  
  selection = [true, false];
}
