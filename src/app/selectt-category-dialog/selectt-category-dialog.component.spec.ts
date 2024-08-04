import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecttCategoryDialogComponent } from './selectt-category-dialog.component';

describe('SelecttCategoryDialogComponent', () => {
  let component: SelecttCategoryDialogComponent;
  let fixture: ComponentFixture<SelecttCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecttCategoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecttCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
