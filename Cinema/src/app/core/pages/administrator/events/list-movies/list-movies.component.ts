import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { xMovie } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movies';
import { TmdbService } from 'src/app/core/services/tmdb/tmdb.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss'],
})
export class ListMoviesComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  movies: xMovie[] = [];
  movietmdb:Movie[] = [];
  ready: boolean = false;

  constructor(private databaseService: DataBaseService, private router:Router,private tmdbService : TmdbService) { }


  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.ready = false;
    this.databaseService.getMovies().subscribe((response) => {
      this.movies = response;
      this.getMovieFromTMDB();
    });
  }

  getMovieFromTMDB(){
    for(const movie of this.movies){
      this.tmdbService.getMovieById(movie.id_movie.toString()).subscribe((response) =>{
        this.movietmdb.push(response);
        this.ready = true;
      })
    }
  }

  updateMovie(movie: xMovie,status:string){
    movie.movie_status = Number(status);
    this.databaseService.updateMovie(movie.id_movie,movie).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );
  }

  deleteMovie(id: number|undefined) {
    this.databaseService.deleteMovie(id)
      .subscribe(
        res => {
          console.log(res);
          location.reload();
          this.getMovies();
        },
        err => console.error(err)
      )
  }
}