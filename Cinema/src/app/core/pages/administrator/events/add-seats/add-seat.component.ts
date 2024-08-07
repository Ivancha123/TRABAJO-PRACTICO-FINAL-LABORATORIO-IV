import { Component, OnInit, HostBinding } from '@angular/core';
import { Room, Seat } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-seats',
  templateUrl: './add-seat.component.html',
  styleUrls: ['./add-seat.component.scss'],
})
export class SeatFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  seat: Seat = {
    id_seat: 0,
    id_Room: 0,
    seat_letter: '',
    seat_number: 0,
  };

  seatsAux: Seat [] = [];

  rooms: Room[] = [];
  room: Room = {
    id_room: 0,
    room_name: '',
    capacity: 0,
  }

  flag = 0;

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getRooms();
  }

  saveNewSeat(id_room: string, seat_letter: string, seat_number: string) {
    let i = 0;
    this.seat.id_Room = Number(id_room);
    this.seat.seat_letter = seat_letter;
    this.seat.seat_number = Number(seat_number);
    this.seat.seat_status = 1;
    this.databaseService.getSeatForRoom2(id_room).subscribe(res=>{
        this.seatsAux = res;
        for (const seatAux of this.seatsAux){
          if(seatAux.seat_letter == seat_letter && seatAux.seat_number == Number(seat_number)){
            this.flag = 1;
            console.log(this.flag);
            console.log(seatAux);
          }
        }
        if(this.flag != 1){
          if(seat_letter != '' && seat_number != '0'){
            this.databaseService.saveSeat(this.seat)
          .subscribe(
            res => {
              alert('Seat saved');
              this.router.navigate(['/administrator']);
            },
            err => console.error(err)
          )
            
          }else{
            alert('Seat letter and number can´t be null');
          }
      }else{
        alert('That seat already exist');
        location.reload();
      }
      })
    
    
    
  }

  getRooms() {
    this.databaseService.getRooms().subscribe((response) => {
      this.rooms = response;
      console.log(response);
    });
  }

}