import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Person } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  person: Person = {
    id_person: 0,
    user_name: '',
    password: '',
    document: '',
    lastname: '',
    born: new Date(),
    genre: '',
    phone: '',
    email: ''
  };
  
  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute,private cookieServie: CookieService) { }

  ngOnInit() {
    
  }

  getPerson(user: string, password: string){
    this.databaseService.getPersonForUsername(user)
        .subscribe(
          res => {
            console.log(res);
            this.person = res as Person;
            if(res!=null && (this.person.user_name === user && this.person.password == password ))
            {
              localStorage.setItem("login","true");
              localStorage.setItem("idUser",this.person.id_person!.toString());
              if(this.person.id_person == 1)
              {
                localStorage.setItem("admin","true");
              }else
              {
                localStorage.setItem("admin","false");
              }
              location.reload();
            }else
            {
              localStorage.setItem("login","false");
              localStorage.setItem("admin","false");
              this.router.navigate(['/']);
            }
          },
          err => console.log(err)
        )
  }
}
