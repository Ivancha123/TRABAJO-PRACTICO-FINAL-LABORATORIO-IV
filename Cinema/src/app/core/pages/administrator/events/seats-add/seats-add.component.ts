import { Component, OnInit, HostBinding } from '@angular/core';
import { Seat } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seats-list',
  templateUrl: './seats-add.component.html',
  styleUrls: ['./seats-add.component.css'],
})
export class SeatFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  seat: Seat = {
    id_seat: 0,
    id_Room: 0,
    seat_letter: '',
    seat_number: 0,
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.databaseService.getSeat(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.seat = res as Seat;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewSeat() {
    this.databaseService.saveSeat(this.seat)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/seats']);
        },
        err => console.error(err)
      )
  }

  updateSeat() {
    this.databaseService.updateSeat(this.seat.id_seat!, this.seat)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/seats']);
        },
        err => console.error(err)
      )
  }

}