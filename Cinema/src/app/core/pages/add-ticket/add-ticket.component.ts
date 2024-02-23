import { Component, OnInit, HostBinding } from '@angular/core';
import { Ticket, Function } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  ticket: Ticket = {
    id_ticket: 0,
    id_person: 0,
    id_function: 0,
    id_card: 0,
    id_seat: 0,
    mount: 0,
  };

  function: Function = {
    id_function: 0,
    function_date: '',
    function_hour: '',
    id_movie: 0,
    id_room: 0,
    price: 0,
  }

  functions: Function[] = [];

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
  }

  getFunctions(){
    
  }
  saveNewTicket() {
    const params = this.activatedRoute.snapshot.params;
    this.ticket.id_person = Number(localStorage.getItem("idUser"));
    this.ticket.id_function = params["id_function"];
    this.ticket.id_card = params["id_card"];
    this.ticket.id_seat = params["id_seat"];
    this.databaseService.getFunction(params["id_function"]).subscribe(res =>{
      this.function = res as Function;
      this.ticket.mount = this.function.price;
      this.databaseService.saveTicket(this.ticket)
      .subscribe(
      res => {
          console.log(res);

        },
        err => console.error(err)
        )
      })
    
  }

  

}
