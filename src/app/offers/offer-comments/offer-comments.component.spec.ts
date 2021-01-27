import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCommentsComponent } from './offer-comments.component';

describe('OfferCommentsComponent', () => {
  let component: OfferCommentsComponent;
  let fixture: ComponentFixture<OfferCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
