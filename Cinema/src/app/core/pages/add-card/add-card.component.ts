import { Component, OnInit, HostBinding } from '@angular/core';
import { Card } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  cards: Card[] = [];

  card: Card = {
    id_card: 0,
    number: 0,
    id_person: 0,
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCards();
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params['id']) {
      this.databaseService.getCard(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.card = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewCard(number: string) {
    delete this.card.id_card;
    this.card.id_person = 1;
    this.card.number = Number(number)
    if(number.length != 12){
      alert('Your card number must be with 12 digits');
    }else{
      this.databaseService.saveCard(this.card)
    .subscribe(
      res => {
        console.log(res);
        alert('Your card has been succesfully saved');
        
      },
      err => console.error(err)
    )
    }
    
    
  }
  getCards() {
    this.databaseService.getCards().subscribe((response) => {
      this.cards = response;
      console.log(response);
    });
  }

  deleteCard(id: number|undefined) {
    this.databaseService.deleteCard(id)
      .subscribe(
        res => {
          console.log(res);
          this.getCards();
        },
        err => console.error(err)
      )
  }

}
