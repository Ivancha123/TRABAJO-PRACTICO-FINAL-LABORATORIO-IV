import { Component, OnInit, HostBinding } from '@angular/core';
import { Room } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  room: Room = {
    id_room: 0,
    room_name: '',
    capacity: 0,
  };

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

  saveNewRoom(room_name: string) {
    this.room.room_name = room_name;
    this.room.capacity = 250;
    this.databaseService.getRoomForName(room_name).subscribe(res=>{
      if(res!= null){
        alert("There´s already a room with that name");
      }else{
        this.databaseService.saveRoom(this.room)
      .subscribe(
        res => {
          alert("Room saved");
          this.router.navigate(['/administrator']);
          
        },
        err => console.error(err)
      )
      }
      
    })
    
  }

}