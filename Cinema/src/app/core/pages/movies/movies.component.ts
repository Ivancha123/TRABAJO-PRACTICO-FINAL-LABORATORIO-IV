import { Component } from '@angular/core';
import { Movie } from '../../interfaces/movies';
import { TmdbService } from '../../services/tmdb/tmdb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  movies: Movie[] = [];

  constructor(private tmdbService: TmdbService) {
    this.pushMoviestoArray(["550", "808", "5800", "562"]);
  }
  pushMoviestoArray(moviesIds: string[] | string) {
    if (moviesIds instanceof Array) {
      for (const movieId of moviesIds) {
        this.tmdbService.getMovieById(movieId).subscribe(movie => {
          this.movies.push(movie);
        });
      }
    } else {
      this.tmdbService.getMovieById(moviesIds).subscribe(movie => {
        this.movies.push(movie);
      });
    }
  }
}