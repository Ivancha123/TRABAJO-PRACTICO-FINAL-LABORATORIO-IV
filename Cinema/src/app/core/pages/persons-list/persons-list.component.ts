import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Person } from 'src/app/core/interfaces/database.module';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css'],
})
export class PersonsListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  persons: any = [];

  constructor(private databaseService: DataBaseService) { }


  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.databaseService.getPersons()
      .subscribe(
        res => {
          this.persons = res;
        },
        err => console.error(err)
      );
  }

  deletePerson(id: string) {
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