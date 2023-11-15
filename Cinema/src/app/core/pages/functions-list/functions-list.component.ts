import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Function } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-functions-list',
  templateUrl: './functions-list.component.html',
  styleUrls: ['./functions-list.component.css'],
})
export class FunctionsListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  functions: Function[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getFunctions();
  }

  getFunctions() {
    this.databaseService.getFunctions().subscribe((response) => {
      this.functions = response;
      console.log(response);
    });
  }

  deleteFunction(id: number|undefined) {
    this.databaseService.deleteFunction(id)
      .subscribe(
        res => {
          console.log(res);
          this.getFunctions();
        },
        err => console.error(err)
      )
  }

}