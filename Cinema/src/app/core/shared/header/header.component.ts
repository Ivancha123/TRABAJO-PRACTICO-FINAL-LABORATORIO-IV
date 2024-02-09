import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit{

  loginSwitch: boolean = false;
  isLogin: boolean = localStorage.getItem("login")==="true"?true:false;
  isAdmin: boolean = localStorage.getItem("admin")==="true"?true:false;

  ngOnInit() {
    this.refresh();
    console.log(this.isLogin);
    console.log(this.isAdmin);
  }

  constructor(private router: Router, private cookieService: CookieService) { }
  ngAfterViewInit(): void {
    this.refresh();
  }

  navigate(direccion: string) {
    this.router.navigate([direccion]);
  }
  
  openLogin() {
    this.loginSwitch = true;
  }

  makeClick() {
    console.log("click");
  }

  logout(){
    console.log(localStorage.getItem("login"));
    console.log(localStorage.getItem("admin"));
    localStorage.setItem("login","false");
    localStorage.setItem("admin","false");
    localStorage.removeItem("idUser");
    this.refresh();
  }

  refresh(){
    this.isLogin = localStorage.getItem("login")==="true"?true:false;
    this.isAdmin = localStorage.getItem("admin")==="true"?true:false;
    console.log(this.isLogin);
    console.log(this.isAdmin);
  }
}

