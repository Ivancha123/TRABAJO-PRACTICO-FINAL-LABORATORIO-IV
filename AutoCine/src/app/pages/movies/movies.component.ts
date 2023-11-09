import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MovieComponent implements OnInit {
  movies: any[] = [];

  constructor(private moviesService:MoviesService) { }

  ngOnInit() {
    this.moviesService.getMovies(1).subscribe(movies => {
      console.log(movies);
    });
    }
  }

