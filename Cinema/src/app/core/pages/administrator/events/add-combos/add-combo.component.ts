import { Component, OnInit, HostBinding } from '@angular/core';
import { Combo } from 'src/app/core/interfaces/database.module';
import { DataBaseService } from 'src/app/core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-combo',
  templateUrl: './add-combo.component.html',
  styleUrls: ['./add-combo.component.scss'],
})
export class AddComboComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  combos: Combo = {
    id_combo: 0,
    combo_description: '',
    price: 0,
  };

  edit: boolean = false;

  constructor(private databaseService: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.databaseService.getCombo(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.combos = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewCombo() {
    delete this.combos.id_combo;
    this.databaseService.saveCombo(this.combos)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/administrator']);
        },
        err => console.error(err)
      )
  }

  updateCombo() {
    this.databaseService.updateCombo(this.combos.id_combo!, this.combos)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/administrator']);
        },
        err => console.error(err)
      )
  }

}