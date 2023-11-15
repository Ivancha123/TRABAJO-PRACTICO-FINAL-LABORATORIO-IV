import { Component, OnInit, HostBinding } from '@angular/core';
import { Function } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-functions-list',
  templateUrl: './functions-add.component.html',
  styleUrls: ['./functions-add.component.css'],
})
export class FunctionFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  function: Function = {
    id_function: 0,
    id_movie: 0,
    id_room: 0,
    price: 0,
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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
          this.router.navigate(['/functions']);
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

}