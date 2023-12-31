import { Component, OnInit, HostBinding } from '@angular/core';

import { DataBaseService } from 'src/app/core/services/database/database.service';
import { TicketFormat } from 'src/app/core/interfaces/database.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.scss'],
})
export class ListTicketComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  
  tickets: TicketFormat[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.databaseService.getTicketsFormat().subscribe((response) => {
      this.tickets = response;
      console.log(this.tickets);
    });
  }
  

}
