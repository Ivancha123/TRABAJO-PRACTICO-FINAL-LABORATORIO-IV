import { Component, OnInit, HostBinding } from '@angular/core';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movies';
import { TmdbService } from 'src/app/core/services/tmdb/tmdb.service';
import { xMovie } from 'src/app/core/interfaces/database.module';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {

  searchResult: string = '';
  movies: Movie[] = [];

  xmovie: xMovie = {
    id_movie: 0,
    title: '',
    movie_status: 0
  };

  constructor(private tmdbService: TmdbService, private dbService:DataBaseService){

  }

  ngOnInit(): void {
    
  }
  
  addMovie(movie: Movie){
      this.xmovie!.id_movie = movie.id;
      this.xmovie!.movie_status = 0;
      this.xmovie!.title = movie.title;
      this.dbService.getMovie(String(this.xmovie!.id_movie)).subscribe(res=>{
        if(res!=null){
          alert('The movie is already in the database');
        }else{
          this.dbService.saveMovie(this.xmovie!).subscribe(res => {
            console.log(res);
            alert('Your movie has been uploaded successfully');
          }, 
          err => console.error(err)
          );
        }
        
      })
      
  }
 
  find(value: string) {
    this.searchResult = value;
    if(this.searchResult !== ''){
      this.tmdbService.searchMovie(this.searchResult).subscribe((response) =>{
        this.movies = response;
        console.log(this.movies)
      })
    }
  }

}