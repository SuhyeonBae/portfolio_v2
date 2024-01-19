import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToHomeScreenComponent } from './add-to-home-screen.component';

describe('AddToHomeScreenComponent', () => {
  let component: AddToHomeScreenComponent;
  let fixture: ComponentFixture<AddToHomeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToHomeScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
