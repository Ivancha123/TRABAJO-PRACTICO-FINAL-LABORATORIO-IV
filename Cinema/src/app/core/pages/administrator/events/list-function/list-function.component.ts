import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Function, Room, xMovie } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-function',
  templateUrl: './list-function.component.html',
  styleUrls: ['./list-function.component.scss'],
})
export class ListFunctionComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  
  
  functions: Function[] = [];
  room!: Room;
  movie!: xMovie;
  rooms: Room[] = [];
  movies: xMovie[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getFunctions();
  }

  getFunctions() {
    this.databaseService.getFunctions().subscribe((response) => {
      let i: number;
      this.functions = response;
      console.log(this.functions);
      for(i=0;i < this.functions.length;i++)
      {
        const id_movie = this.functions[i].id_movie?.toString();
        const id_room = this.functions[i].id_room?.toString();
        this.databaseService.getRoom(id_room).subscribe((response) => {
            this.room = response;
            console.log(this.room);
            this.rooms.push(this.room);
        });
        this.databaseService.getMovie(id_movie).subscribe((response) => {
            this.movie = response;
            console.log(this.movie);
            this.movies.push(this.movie);
        });
      }
      
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
