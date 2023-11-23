import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, delay, interval, tap, timer } from 'rxjs';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Movie, MoviesResponse } from '../../interfaces/movies';
import { DataBaseService } from '../../services/database/database.service';
import { Person, xMovie } from '../../interfaces/database.module';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSlideShow: Movie[] = [];
  @HostListener('window:scroll', ['$event'])
  movieId = '808';
  persons: Person[] = [];

  moviesdb: xMovie[] = [];

  constructor(private tmdbService: TmdbService, private dbService: DataBaseService, private zone: NgZone) { }
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) * 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.tmdbService.onLoad) { return; }
      this.tmdbService.getMovies().subscribe(movies => {
        this.movies.push(...movies);
      })
    }

  }

  ngOnInit() {

    this.loadPersons();

    this.dbService.getMovies().subscribe((response) => {
      this.moviesdb = response;
      this.getMovieFromTMDB();
    });


  }

  getMovieFromTMDB() {
    for (const movie of this.moviesdb) {
      this.tmdbService.getMovieById(movie.id_movie.toString()).subscribe((response) => {
        if (movie.movie_status === 0)
          this.moviesSlideShow.push(response);
        else
          this.movies.push(response);
      })
    }
  }

  loadPersons(): void {
    this.dbService.getPersons().subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.error('Error al cargar personas:', error);
      },
      () => {
        console.log(this.persons);
      }
    );
  }

  ngOnDestroy() {
    this.tmdbService.resetMoviesPage();
  }
}