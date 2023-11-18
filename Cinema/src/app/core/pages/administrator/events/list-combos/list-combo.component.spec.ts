import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComboComponent } from './list-combo.component';

describe('ListComboComponent', () => {
  let component: ListComboComponent;
  let fixture: ComponentFixture<ListComboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComboComponent]
    });
    fixture = TestBed.createComponent(ListComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
