import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { WordsSorterGameComponent } from '../words-sorter-game/words-sorter-game.component';




@Component({
  selector: 'app-summary-sort-word',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatTableModule,WordsSorterGameComponent],
  templateUrl: './summary-sort-word.component.html',
  styleUrl: './summary-sort-word.component.css'
})
export class SummarySortWordComponent implements OnInit  {
  
  points: number = 0;
  summaryWords: { english: string; category: string; success: boolean }[] = [];
  displayedColumns: string[] = ['english', 'category', 'result']; // הגדרת העמודות

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      points: number;
      results: { english: string; category: string; success: boolean }[];
    };

    if (state) {
      this.points = state.points;
      this.summaryWords = state.results;
    }
  }

  ngOnInit(): void {}
}