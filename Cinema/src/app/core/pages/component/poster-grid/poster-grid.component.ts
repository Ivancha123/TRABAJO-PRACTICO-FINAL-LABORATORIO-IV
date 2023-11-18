import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movies';

@Component({
  selector: 'app-poster-grid',
  templateUrl: './poster-grid.component.html',
  styleUrls: ['./poster-grid.component.scss']
})
export class PosterGridComponent implements OnInit {

  @Input() movies?:Movie[];
 
  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.movies)
  }

  onMovieClick(movie:Movie){
    this.router.navigate(['/movie', movie.id])
  }
}
