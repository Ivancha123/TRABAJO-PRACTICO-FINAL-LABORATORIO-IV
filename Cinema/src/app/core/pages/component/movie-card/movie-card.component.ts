import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  @Input()
  movie!: Movie;

  constructor () {

  }


}
