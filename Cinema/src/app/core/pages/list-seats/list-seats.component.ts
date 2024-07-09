import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Seat, Function } from 'src/app/core/interfaces/database.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-seats',
  templateUrl: './list-seats.component.html',
  styleUrls: ['./list-seats.component.scss'],
})
export class ListSeatComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  seats: Seat[] = [];
  seat!: Seat;
  function!: Function;
  flag = 0;

  constructor(private databaseService: DataBaseService, private router:Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
      this.getSeats();
  }

  getSeats() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    let idFunction = params["id_function"];
    console.log(idFunction);
    this.databaseService.getFunction(idFunction).subscribe((response) => {
      this.function = response as Function;
      console.log(this.function);
      this.databaseService.getSeatForRoom(idFunction).subscribe((response) => {
        this.seats = response;
        console.log(this.seats);
        if(this.seats.length == 0){
          this.flag = 1;
          console.log(this.flag)
        }
      });
    })
    
  }

  updateSeat(idSeat: number | undefined, seat: Seat) {
    this.databaseService.updateSeat(idSeat, seat)
      .subscribe(
        res => { 
          this.seat.seat_status = 1;
        },
        err => console.error(err)
      )
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