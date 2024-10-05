import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMemoryGameComponent } from './summary-memory-game.component';

describe('SummaryMemoryGameComponent', () => {
  let component: SummaryMemoryGameComponent;
  let fixture: ComponentFixture<SummaryMemoryGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryMemoryGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryMemoryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
