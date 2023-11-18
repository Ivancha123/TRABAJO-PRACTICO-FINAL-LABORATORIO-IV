import { Component, OnInit, HostBinding } from '@angular/core';
import { Function, Room, xMovie } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-function',
  templateUrl: './add-function.component.html',
  styleUrls: ['./add-function.component.scss']
})
export class AddFunctionComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  movies: xMovie[] = [];
  rooms: Room[] = [];

  function: Function = {
    id_function: 0,
    id_movie: 0,
    id_room: 0,
    price: 0,
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getMovies();
    this.getRooms();
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.databaseService.getFunction(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.function = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewFunction() {
    delete this.function.id_function;
    this.databaseService.saveFunction(this.function)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.error(err)
      )
  }

  updateFunction() {
    this.databaseService.updateFunction(this.function.id_function!, this.function)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/functions']);
        },
        err => console.error(err)
      )
  }

  getMovies() {
    this.databaseService.getMovies().subscribe((response) => {
      this.movies = response;
      console.log(response);
    });
  }

  getRooms() {
    this.databaseService.getRooms().subscribe((response) => {
      this.rooms = response;
      console.log(response);
    });
  }

}
