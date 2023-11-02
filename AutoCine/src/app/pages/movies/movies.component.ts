import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/peliculas.module';
import { PeliculasService } from 'src/app/core/services/peliculas/peliculas.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MovieComponent implements OnInit {

  movies:Movie[] = [];
  moviesSlideShow:Movie[] = [];

  constructor(private peliculasSvc:PeliculasService) { }

  ngOnInit(): void {
    this.peliculasSvc.getPeliculas().subscribe(movies=>{
      this.movies = movies;
      this.moviesSlideShow = movies;
    })
  }

}
