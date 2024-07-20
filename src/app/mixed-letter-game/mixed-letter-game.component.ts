import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-mixed-letter-game',
  standalone: true,
  imports: [],
  templateUrl: './mixed-letter-game.component.html',
  styleUrl: './mixed-letter-game.component.css'
})
export class MixedLetterGameComponent implements OnInit {
  @Input () id=""

  
  currentCategory ?: Category
constructor(private CategoriesServicy:CategoriesService){}
ngOnInit(): void {
  this.currentCategory = this.CategoriesServicy.get(parseInt(this.id))
}
}
