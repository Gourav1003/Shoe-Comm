import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoePageComponent } from './shoe-page.component';

describe('ShoePageComponent', () => {
  let component: ShoePageComponent;
  let fixture: ComponentFixture<ShoePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoePageComponent]
    });
    fixture = TestBed.createComponent(ShoePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
