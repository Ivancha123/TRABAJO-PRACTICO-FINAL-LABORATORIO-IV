import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  selectedTheme: string = '#E99AA7';
  constructor(private cookieService: CookieService) {
    this.getThemeForCoockie();
    this.setSelectColor();
  }

  setTheme(theme: string){
    this.setThemeInCoockie(theme);
    this.getThemeForCoockie();
    this.setSelectColor();
  }
  setThemeInCoockie(theme: string) {
    this.cookieService.set('selectedColor', theme);
  }
  getThemeForCoockie(): string {
    return this.selectedTheme = this.cookieService.get('selectedColor');
  }
  setSelectColor() {
    this.selectedTheme = this.selectedTheme;
  }
}
  