import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProceedComponent } from './review-proceed.component';

describe('ReviewProceedComponent', () => {
  let component: ReviewProceedComponent;
  let fixture: ComponentFixture<ReviewProceedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewProceedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewProceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
