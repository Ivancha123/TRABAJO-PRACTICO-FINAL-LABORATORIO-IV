import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Movie } from '../../interfaces/movies';


@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  movies!: Movie;

  ngOnInit() {
    this.pushMoviestoArray("808");
  }

  constructor(private tmdbService: TmdbService) {

  }

  pushMoviestoArray(moviesIds: string) {
    this.tmdbService.getMovieById(moviesIds).subscribe(movie => {
      this.movies = movie;
    });
  }

}
