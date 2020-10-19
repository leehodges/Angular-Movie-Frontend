import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReviewsComponent } from './add-edit-reviews.component';

describe('AddEditReviewsComponent', () => {
  let component: AddEditReviewsComponent;
  let fixture: ComponentFixture<AddEditReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
