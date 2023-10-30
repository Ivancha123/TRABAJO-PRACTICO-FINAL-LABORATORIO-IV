import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MovieListComponent implements OnInit {
  @Input()
  movie = new Movie();
  movieList : Array<Movie> = [];

  @Output()
  selectedMovieEvent = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit() {
  }

  selectMovie(movie : Movie){    
    this.selectedMovieEvent.emit(movie);
  }  
}
