import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  @Input() movie!: Movie;

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.movie)
  }

  onMovieClick(movie:Movie){
    this.router.navigate(['/movie', movie.id])
  }

}
