import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulserviewComponent } from './pulserview.component';

describe('PulserviewComponent', () => {
  let component: PulserviewComponent;
  let fixture: ComponentFixture<PulserviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PulserviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulserviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
