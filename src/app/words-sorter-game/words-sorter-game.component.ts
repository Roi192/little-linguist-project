import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-words-sorter-game',
  standalone: true,
  imports: [],
  templateUrl: './words-sorter-game.component.html',
  styleUrl: './words-sorter-game.component.css'
})
export class WordsSorterGameComponent implements OnInit {
  @Input () id=""

  currentCategory ?: Category
constructor(private CategoriesService:CategoriesService){}
ngOnInit(): void {
  this.currentCategory = this.CategoriesService.get(parseInt(this.id))
  
}
}
