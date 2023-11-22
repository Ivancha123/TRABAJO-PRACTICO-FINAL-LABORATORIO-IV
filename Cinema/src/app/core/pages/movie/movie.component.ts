import { Component, Input, OnInit } from '@angular/core';
import { Cast, Movie, MovieDetails } from '../../interfaces/movies';
import { combineLatest } from 'rxjs';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Function, Comment } from '../../interfaces/database.module';
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
  comments: Comment[] = [];
  comment!: Comment;

  constructor(private dataBaseService: DataBaseService, private tmdbService: TmdbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
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
          },
          err => console.log(err)
        )
      this.getComments();
    }
    getComments(){
      const params = this.activatedRoute.snapshot.params;
      this.dataBaseService.getCommentByMovie(params["id_movie"])
        .subscribe(
          res => {
            console.log(res);
            this.comments = res;
          },
          err => console.log(err)
        )
    }

    
    saveNewComment() {
      const params = this.activatedRoute.snapshot.params;
      this.comment.id_movie = params["id_movie"];
      this.comment.id_person = 1;
      this.comment.date = new Date();
      this.dataBaseService.saveComment(this.comment)
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        )
    }
  }
