import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  loginSwitch: boolean = false;
  isLogin: boolean = false;

  constructor(private router: Router) {}
  
  navigate(direccion: string) {
    this.router.navigate([direccion]);
  }
  
  openLogin(){
    this.loginSwitch=true;
  }
}

