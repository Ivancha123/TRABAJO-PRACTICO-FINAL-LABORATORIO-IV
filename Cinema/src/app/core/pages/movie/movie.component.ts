import { Component, Input, OnInit } from '@angular/core';
import { Cast, Movie, MovieDetails } from '../../interfaces/movies';
import { combineLatest } from 'rxjs';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  functions: any;

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
          },
          err => console.log(err)
        )
    }
  }
