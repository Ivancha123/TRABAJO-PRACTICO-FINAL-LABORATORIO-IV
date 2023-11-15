import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Combo } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-combos-list',
  templateUrl: './combos-list.component.html',
  styleUrls: ['./combos-list.component.css'],
})
export class ComboListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  combos: Combo[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getCombos();
  }

  getCombos() {
    this.databaseService.getCombos().subscribe((response) => {
      this.combos = response;
      console.log(response);
    });
  }

  deleteCombo(id: number|undefined) {
    this.databaseService.deleteCombo(id)
      .subscribe(
        res => {
          console.log(res);
          this.getCombos();
        },
        err => console.error(err)
      )
  }

}