import { Component, OnInit, HostBinding } from '@angular/core';
import { Room } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css'],
})
export class RoomFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  room: Room = {
    id_room: 0,
    room_name: '',
    capacity: 0,
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.databaseService.getRoom(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.room = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewRoom() {
    delete this.room.id_room;
    this.databaseService.saveRoom(this.room)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/rooms']);
        },
        err => console.error(err)
      )
  }

  updateRoom() {
    this.databaseService.updateRoom(this.room.id_room!, this.room)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/rooms']);
        },
        err => console.error(err)
      )
  }

}