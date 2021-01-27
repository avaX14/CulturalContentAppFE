import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOfferPageComponent } from './single-offer-page.component';

describe('SingleOfferPageComponent', () => {
  let component: SingleOfferPageComponent;
  let fixture: ComponentFixture<SingleOfferPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleOfferPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOfferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
