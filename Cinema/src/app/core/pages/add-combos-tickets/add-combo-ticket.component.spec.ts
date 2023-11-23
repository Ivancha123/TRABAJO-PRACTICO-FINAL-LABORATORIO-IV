import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComboTicketComponent } from './add-combo-ticket.component';

describe('AddComboTicketComponent', () => {
  let component: AddComboTicketComponent;
  let fixture: ComponentFixture<AddComboTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddComboTicketComponent]
    });
    fixture = TestBed.createComponent(AddComboTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
