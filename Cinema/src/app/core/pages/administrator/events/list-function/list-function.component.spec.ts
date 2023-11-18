import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFunctionComponent } from './list-function.component';

describe('AddFunctionComponent', () => {
  let component: ListFunctionComponent;
  let fixture: ComponentFixture<ListFunctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFunctionComponent]
    });
    fixture = TestBed.createComponent(ListFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
