import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from '../../services/theme/theme.service';
import { DataBaseService } from '../../services/database/database.service';
import { Person } from '../../interfaces/database.module';
import { Router } from '@angular/router';

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

  person: Person = {
    id_person: 0,
    document: '',
    user_name: '',
    lastname: '',
    born: '',
    genre: '',
    phone: '',
    email: '',
    password: '',
  };

  gPerson: Person = {
    id_person: 0,
    document: '',
    user_name: '',
    lastname: '',
    born: '',
    genre: '',
    phone: '',
    email: '',
    password: '',
  };

  constructor(private themeService: ThemeService,private databaseService: DataBaseService, private router: Router) {

  }

  ngOnInit() {
    this.getPerson();
  }

  saveSelectedColorToCookie(color: string) {
    this.themeService.setTheme(color);

  }

  getPerson(){
    let id_person = localStorage.getItem("idUser")?.toString();
    this.databaseService.getPerson(id_person).subscribe(
      res => {
        this.gPerson = res as Person;
      },
        err => console.error(err)
    )
  }
  updatePerson() {
    this.person.id_person = Number(localStorage.getItem("idUser"));
    this.person.born = "2001-03-23T03:00:00.000Z";
    this.databaseService.updatePerson(this.person.id_person, this.person)
      .subscribe(
        res => { 
          console.log(res);
          alert('Your user has been updated');
          this.router.navigate(['/']);
        },
        err => console.error(err)
      )
  }

}
