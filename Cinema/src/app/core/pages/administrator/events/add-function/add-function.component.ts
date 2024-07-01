import { Component, OnInit, HostBinding } from '@angular/core';
import { Function, Room, Seat, xMovie } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Time } from '@angular/common';

@Component({
  selector: 'app-add-function',
  templateUrl: './add-function.component.html',
  styleUrls: ['./add-function.component.scss']
})
export class AddFunctionComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  movies: xMovie[] = [];
  rooms: Room[] = [];
  room: Room = {
    id_room: 0,
    room_name: '',
    capacity: 0,
  }

  function: Function = {
    id_function: 0,
    id_movie: 0,
    id_room: 0,
    price: 0,
    function_date: '',
    function_hour: ''
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getMovies();
    this.getRooms();
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.databaseService.getFunction(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.function = res as Function;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
    
  }
  saveNewFunction(id_movie: string, id_room: string, function_date: Date | null, function_hour: string, price: string) {
    this.function.id_movie = Number(id_movie);
    this.function.id_room = Number(id_room);
    this.function.price = Number(price);
    if (!function_date || !function_hour) {
      const adviseElement = document.getElementById('advise');
      adviseElement!.style.color = 'red';
      return;
    }
    this.function.function_date = function_date.getFullYear()+ '-'+(function_date.getMonth()+ 1)+'-'+function_date.getDate();
    this.function.function_hour = function_hour;
    if(function_date != null && function_hour != null)
      { 
      this.databaseService.saveFunction(this.function)
      .subscribe(
        res => {
          console.log(res);
          alert("Function saved");
          this.router.navigate(['/administrator']);
        },
        err => console.error(err)
      )
    }else{
      alert("Date or Hour can´t be null");
    }
  }

  updateFunction() {
    this.databaseService.updateFunction(this.function.id_function!, this.function)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/administrator']);
        },
        err => console.error(err)
      )
  }

  getMovies() {
    this.databaseService.getMovies().subscribe((response) => {
      this.movies = response;
      console.log(response);
    });
  }

  getRooms() {
    this.databaseService.getRooms().subscribe((response) => {
      this.rooms = response;
      console.log(response);
    });
  }

}
