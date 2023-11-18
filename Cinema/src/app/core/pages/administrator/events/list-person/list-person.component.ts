import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Person } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss'],
})
export class ListPersonsComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  persons: Person[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.databaseService.getPersons().subscribe((response) => {
      this.persons = response;
    });
  }

  deletePerson(id: number|undefined) {
    this.databaseService.deletePerson(id)
      .subscribe(
        res => {
          console.log(res);
          this.getPersons();
        },
        err => console.error(err)
      )
  }

}