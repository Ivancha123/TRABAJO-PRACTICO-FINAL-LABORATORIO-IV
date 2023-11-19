import { Component, OnInit, HostBinding } from '@angular/core';
import { xMovie } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdatingService } from 'src/app/core/services/updating/updating.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  combos: xMovie = {
    id_movie: 0,
    title: '',
    movie_status: 0,
  };

  edit: boolean = false;

  constructor(private updatingService: UpdatingService,private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

  updateMovies(){
    this.updatingService.updateMoviesLastMoviesInDataBase();
  }


}