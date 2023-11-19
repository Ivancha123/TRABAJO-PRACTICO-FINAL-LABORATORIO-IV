import { Injectable } from '@angular/core';
import { DataBaseService } from '../database/database.service';
import { TmdbService } from '../tmdb/tmdb.service';
import { Movie } from '../../interfaces/movies';
import { xMovie } from '../../interfaces/database.module';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatingService {


  movies: Movie[] = [];
  xMovies: xMovie[] = [];
  idArray: string[] = [];
  xMovie: xMovie | undefined;
  constructor(private dataBaseService: DataBaseService, private tmdbService: TmdbService, private router: Router) {

  }


  pushMoviestoArray(moviesIds: string[] | string) : Movie[] {
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
    return this.movies;
  }

  saveMovieByIdInDataBase(moviesIds: string | string[]) {
    if (moviesIds instanceof Array) {
      for (const movieId of moviesIds) {
        this.tmdbService.getMovieById(movieId).subscribe(movies => {
          this.movies.push(movies);
        });
      }
    } else {
      this.tmdbService.getMovieById(moviesIds).subscribe(movies => {
        this.movies.push(movies);
      });
    }
    this.saveMovieArrayinDatabase();
  }


  updateMoviesLastMoviesInDataBase() {
    this.tmdbService.getMovies().subscribe(movies => {

      if (movies instanceof Array) {
        for (const movie of movies) {
          this.movies.push(movie);
        }
      } else {
        this.movies.push(movies);
      }
    });

    this.saveMovieArrayinDatabase();
  }

  saveMovieArrayinDatabase() {
    for (const movie of this.movies) {
      this.xMovie!.id_movie = movie.id;
      this.xMovie!.movie_status = 2;
      this.xMovie!.title = movie.title;
      this.dataBaseService.saveMovie(this.xMovie!).subscribe(res => {
        this.router.navigate(['/'])
      });
    }
    this.movies = [];
  }
}
