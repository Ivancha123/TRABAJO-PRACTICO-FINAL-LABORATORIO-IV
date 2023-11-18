import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComboComponent } from './add-combo.component';

describe('AddComboComponent', () => {
  let component: AddComboComponent;
  let fixture: ComponentFixture<AddComboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddComboComponent]
    });
    fixture = TestBed.createComponent(AddComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
