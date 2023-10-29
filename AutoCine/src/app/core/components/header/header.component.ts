import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loginSwitch: boolean = false;
  constructor(private router: Router) {

  }
  navegar(direccion: string) {
    this.router.navigate([direccion]);
  }

  openLogin(){
    this.loginSwitch=true;
  }


}
