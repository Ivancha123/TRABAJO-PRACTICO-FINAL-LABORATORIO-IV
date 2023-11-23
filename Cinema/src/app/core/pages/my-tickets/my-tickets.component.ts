import { Component, HostBinding } from '@angular/core';
import { DataBaseService } from '../../services/database/database.service';
import { Router } from '@angular/router';
import { TicketFormat } from '../../interfaces/database.module';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent {

  @HostBinding('class') classes = 'row';
  
  tickets: TicketFormat[] = [];

  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.databaseService.getTicketsFormatByUser(localStorage.getItem("idUser")).subscribe((response) => {
      this.tickets = response;
      console.log(this.tickets);
    });
  }
  
}
