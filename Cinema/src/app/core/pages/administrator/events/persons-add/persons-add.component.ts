import { Component, OnInit, HostBinding } from '@angular/core';
import { Person } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-add.component.html',
  styleUrls: ['./persons-add.component.css'],
})
export class PersonFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  person: Person = {
    id_person: 0,
    document: '',
    user_name: '',
    lastname: '',
    born: new Date(),
    genre: '',
    phone: '',
    email: '',
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.databaseService.getPerson(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.person = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewPerson() {
    delete this.person.id_person;
    this.databaseService.savePerson(this.person)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/persons']);
        },
        err => console.error(err)
      )
  }

  updatePerson() {
    this.databaseService.updatePerson(this.person.id_person!, this.person)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/persons']);
        },
        err => console.error(err)
      )
  }

}