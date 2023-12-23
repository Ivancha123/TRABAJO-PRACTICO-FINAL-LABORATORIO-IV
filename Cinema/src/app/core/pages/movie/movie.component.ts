import { Component, Input, OnInit } from '@angular/core';
import { Cast, Movie, MovieDetails } from '../../interfaces/movies';
import { Observable, combineLatest } from 'rxjs';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Function, CommentFormat } from '../../interfaces/database.module';
import { DataBaseService } from '../../services/database/database.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  haveFunction = false;
  movie?: MovieDetails;
  cast: Cast[] = [];
  functions: Function[] = [];
  comments: CommentFormat[] = [];
  flag = false;

  constructor(private dataBaseService: DataBaseService, private tmdbService: TmdbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  receiveMessage($event: string) {
    location.reload();
  }

  ngOnInit() {
    this.flag = localStorage.getItem("idUser") != null?true:false;
    console.log(this.flag);
    const { id } = this.activatedRoute.snapshot.params;
    console.log(id);
    combineLatest([
      this.tmdbService.getPeliculaDetalle(id),
      this.tmdbService.getCast(id)
    ]).subscribe(([movie, cast]) => {

      if (!movie) {
        this.router.navigateByUrl('/');
        return;
      }

      this.movie = movie;
      this.cast = cast;
    })
    this.dataBaseService.getFunctionByMovie(id)
        .subscribe(
          res => {
            console.log(res);
            this.functions = res;
            if(this.functions.length > 0)
            {
              this.haveFunction = true;
            }
            for(const functions of this.functions)
            {
              let date = new Date(functions.function_date); 
              functions.function_date = date.toDateString();
            }
          },
          err => console.log(err)
        )
      this.getComments();
    }
    getComments(){
      const params = this.activatedRoute.snapshot.params;
      this.dataBaseService.getCommentByMovie(params["id"])
        .subscribe(
          res => {
            console.log(res);
            this.comments = res as CommentFormat[];
            console.log(this.comments);
            for(const comment of this.comments)
            {
              let date = new Date(comment.date); 
              comment.date = date.toDateString();
            }
          },
          err => console.log(err)
        )
    }
  }
