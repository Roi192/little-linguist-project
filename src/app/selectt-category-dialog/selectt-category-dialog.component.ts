import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // הוסף את זה כדי לאפשר את השימוש ב-ngModel
import { GameProfile } from '../../shared/model/GameProfile';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-selectt-category-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatFormFieldModule, MatSelectModule, MatButtonModule,FormsModule,],
  templateUrl: './selectt-category-dialog.component.html',
  styleUrl: './selectt-category-dialog.component.css'
})
export class SelecttCategoryDialogComponent implements OnInit {
  selectedCategory?: Category;
  categories: Category[] = [];

  constructor(
    public categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<SelecttCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameProfile,
    
  ) {}

  ngOnInit(): void {
    this.categories = this.categoriesService.list();
  }

  letsPlay(): void {
    if (this.selectedCategory) {
      this.dialogRef.close();
      //this.router.navigate([`${this.data.Url}`, this.selectedCategory.id]);
    }
  }
}

