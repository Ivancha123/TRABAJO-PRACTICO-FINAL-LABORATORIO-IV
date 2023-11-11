import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movies';
import { TmdbService } from '../../services/tmdb/tmdb.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private tmdbService: TmdbService) {

  }
    ngOnInit(){
      this.pushMoviestoArray(["550","808","5800"]);
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
