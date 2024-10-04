import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySortWordComponent } from './summary-sort-word.component';

describe('SummarySortWordComponent', () => {
  let component: SummarySortWordComponent;
  let fixture: ComponentFixture<SummarySortWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarySortWordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarySortWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
