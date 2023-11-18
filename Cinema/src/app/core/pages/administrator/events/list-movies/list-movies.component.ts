import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { xMovie } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss'],
})
export class ListMoviesComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  movies: xMovie[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.databaseService.getMovies().subscribe((response) => {
      this.movies = response;
      console.log(this.movies);
    });
  }

  deleteMovie(id: number|undefined) {
    this.databaseService.deleteMovie(id)
      .subscribe(
        res => {
          console.log(res);
          this.getMovies();
        },
        err => console.error(err)
      )
  }

}