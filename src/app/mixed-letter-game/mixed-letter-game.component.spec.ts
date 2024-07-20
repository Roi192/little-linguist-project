import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedLetterGameComponent } from './mixed-letter-game.component';

describe('MixedLetterGameComponent', () => {
  let component: MixedLetterGameComponent;
  let fixture: ComponentFixture<MixedLetterGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedLetterGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedLetterGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
