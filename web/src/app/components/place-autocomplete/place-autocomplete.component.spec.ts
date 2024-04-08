import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAutocompleteComponent } from './place-autocomplete.component';

describe('PlaceAutocompleteComponent', () => {
  let component: PlaceAutocompleteComponent;
  let fixture: ComponentFixture<PlaceAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
