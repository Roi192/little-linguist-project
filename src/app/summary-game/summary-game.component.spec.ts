import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGameComponent } from './summary-game.component';

describe('SummaryGameComponent', () => {
  let component: SummaryGameComponent;
  let fixture: ComponentFixture<SummaryGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
