import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigidetallesComponent } from './digidetalles.component';

describe('DigidetallesComponent', () => {
  let component: DigidetallesComponent;
  let fixture: ComponentFixture<DigidetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigidetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigidetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
