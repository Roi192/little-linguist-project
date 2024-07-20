import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsSorterGameComponent } from './words-sorter-game.component';

describe('WordsSorterGameComponent', () => {
  let component: WordsSorterGameComponent;
  let fixture: ComponentFixture<WordsSorterGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsSorterGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordsSorterGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
