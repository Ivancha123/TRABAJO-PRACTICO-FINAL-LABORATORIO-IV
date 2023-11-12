import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  colors: string[] = [
    '#FFD700',
    '#FFB6C1',
    '#87CEEB',
    '#98FB98',
    '#FFA07A',
    '#DDA0DD',
    '#FFFFE0',
    '#AFEEEE',
    '#FFE4B5',
    '#B0E0E6',
    '#F0E68C',
    '#E6E6FA',
  ];

  constructor(private themeService: ThemeService) {

  }

  saveSelectedColorToCookie(color: string) {
    this.themeService.setTheme(color);

  }

}
