import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes("/administrator?tab=rooms.add")) this.selection = [true, false];
        else if (event.urlAfterRedirects.includes("/administrator?tab=rooms.list")) this.selection = [false, true];
        else this.selection = [true, false];
      }
    });
    
  }
  
  selection = [true, false];
}
