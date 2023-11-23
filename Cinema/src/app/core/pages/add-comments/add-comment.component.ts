import { Component, OnInit, HostBinding } from '@angular/core';
import { Comment } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @HostBinding('class') clases = 'row';


  comment: Comment = {
    id_comment: 0,
    id_movie: 0,
    id_person: 0,
    date: '',
    comment: '',
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  saveNewComment() {
    const params = this.activatedRoute.snapshot.params;
    this.comment.id_movie = params['id_movie'];
    let date = new Date();
    this.comment.date = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
    this.comment.id_person = Number(localStorage.getItem("idUser"));
    console.log(this.comment.id_person);
    this.databaseService.saveComment(this.comment)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      )
  }

}
