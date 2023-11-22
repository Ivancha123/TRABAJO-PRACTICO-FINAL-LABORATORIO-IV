import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { FunctionFormat } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-function',
  templateUrl: './list-function.component.html',
  styleUrls: ['./list-function.component.scss'],
})
export class ListFunctionComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  
  
  functions: FunctionFormat[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getFunctions();
  }

  getFunctions() {
    this.databaseService.getFunctionFormat().subscribe((response) => {
      this.functions = response;
      console.log(this.functions);
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
