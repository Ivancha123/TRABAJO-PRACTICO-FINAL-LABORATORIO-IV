import { Component, HostBinding } from '@angular/core';
import { DataBaseService } from '../../services/database/database.service';
import { Router } from '@angular/router';
import { TicketFormatCombo, TicketFormat } from '../../interfaces/database.module';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent {

  @HostBinding('class') classes = 'row';
  
  ticketsFormatCombo: TicketFormatCombo[] = [];
  ticketsFormat: TicketFormat[] = [];


  constructor(private databaseService: DataBaseService, private router:Router) { }


  ngOnInit() {
    this.getTicketsFormatCombo();
    this.getTicketsFormat();
  }

  getTicketsFormat() {
    this.databaseService.getTicketsFormatByUser(localStorage.getItem("idUser")).subscribe((response)=>{
      this.ticketsFormat = response;
    })
  }
  getTicketsFormatCombo() {
    this.databaseService.getTicketsFormatComboByUser(localStorage.getItem("idUser")).subscribe((response) => {
      this.ticketsFormatCombo = response;
      console.log(this.ticketsFormatCombo);
    });
  }
  
}
