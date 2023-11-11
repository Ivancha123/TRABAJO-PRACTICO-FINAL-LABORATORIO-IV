import { Component, Input, OnInit } from '@angular/core';
import { Observable, delay, interval, tap, timer } from 'rxjs';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Movie, MoviesResponse } from '../../interfaces/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movie: Movie[] = [];
  moviesSlideShow: Movie[] = [];
  movieId = '808';

  constructor(private tmdbService: TmdbService) { }

  /*
    //MUCHAS
    ngOnInit() {
      this.tmdbService.getMovies().subscribe(movies => {
        for (const movie of movies) {
          this.moviesSlideShow.push(movie);
          this.movie.push(movie);
        }
      });
    }
  //UNA
  ngOnInit() {
    const movieId = '550';
    this.tmdbService.getMovieById(movieId).subscribe(movie => {
      this.moviesSlideShow.push(movie);
      this.movie.push(movie);
    });
  }
  */
  ngOnInit() {
    this.tmdbService.getMovies().subscribe(movies => {
      for (const movie of movies) {
        this.moviesSlideShow.push(movie);
        this.movie.push(movie);
      }
    });
  }
  ngOnDestroy() {
  }
}