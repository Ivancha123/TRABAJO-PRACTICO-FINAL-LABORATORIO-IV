import { Component, OnInit, HostBinding } from '@angular/core';
import { Combo, ComboTicket } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-combo-ticket',
  templateUrl: './add-combo-ticket.component.html',
  styleUrls: ['./add-combo-ticket.component.scss'],
})
export class AddComboTicketComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  combosTickets: ComboTicket = {
    id_combo: 0,
    id_ticket: 0,
    amount: 0,
  };

  combos: Combo[] = [];

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCombos();
  }

  saveNewComboTicket(amount: string, combo: string) {
    const params = this.activatedRoute.snapshot.params;
    this.combosTickets.id_ticket = params["id_ticket"];
    this.combosTickets.amount = Number(amount);
    this.combosTickets.id_combo = Number(combo);
    this.databaseService.saveComboTicket(this.combosTickets)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.error(err)
      )
  }

  getCombos() {
    this.databaseService.getCombos().subscribe((response) => {
      this.combos = response;
      console.log(response);
    });
  }

}