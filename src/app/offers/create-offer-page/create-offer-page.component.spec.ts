import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfferPageComponent } from './create-offer-page.component';

describe('CreateOfferPageComponent', () => {
  let component: CreateOfferPageComponent;
  let fixture: ComponentFixture<CreateOfferPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOfferPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
