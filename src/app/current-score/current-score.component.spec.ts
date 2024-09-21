import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentScoreComponent } from './current-score.component';

describe('CurrentScoreComponent', () => {
  let component: CurrentScoreComponent;
  let fixture: ComponentFixture<CurrentScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
