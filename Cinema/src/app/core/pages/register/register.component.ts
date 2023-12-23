import { Component, HostBinding, OnInit } from '@angular/core';
import { Person } from '../../interfaces/database.module';
import { DataBaseService } from '../../services/database/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  alertStatus: Boolean = true;
  alertMessage: string = "I'm a Alert, Look at me!!";

  @HostBinding('class') clases = 'row';

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

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
  }

  saveNewPerson() {
    this.databaseService.savePerson(this.person)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.error(err)
      )
  }

  onSubmit() {

  }

  setAlert(mesagge: string) {
    this.alertStatus = true;
    this.alertMessage = mesagge;
  }

  clearAlert() {
    this.alertStatus = false;
    this.alertMessage = "";
  }
}
