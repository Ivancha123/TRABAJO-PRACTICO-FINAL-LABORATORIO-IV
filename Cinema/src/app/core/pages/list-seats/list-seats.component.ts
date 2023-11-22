import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Seat } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-seats',
  templateUrl: './list-seats.component.html',
  styleUrls: ['./list-seats.component.scss'],
})
export class ListSeatComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  seats: Seat[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getSeats();
  }

  getSeats() {
    this.databaseService.getSeats().subscribe((response) => {
      this.seats = response;
      console.log(response);
    });
  }

  deleteSeat(id: number|undefined) {
    this.databaseService.deleteSeat(id)
      .subscribe(
        res => {
          console.log(res);
          this.getSeats();
        },
        err => console.error(err)
      )
  }

}