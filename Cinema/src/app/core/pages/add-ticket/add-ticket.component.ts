import { Component, OnInit, HostBinding } from '@angular/core';
import { Ticket } from 'src/app/core/interfaces/database.module';
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

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
  }

  saveNewTicket() {
    const params = this.activatedRoute.snapshot.params;
    this.ticket.id_person = Number(localStorage.getItem("idUser"));
    this.ticket.id_function = params["id_function"];
    this.ticket.id_card = params["id_card"];
    this.ticket.id_seat = params["id_seat"];
    this.ticket.mount = 5000;
    this.databaseService.saveTicket(this.ticket)
    .subscribe(
    res => {
        console.log(res);

      },
      err => console.error(err)
      )
  }

  

}
