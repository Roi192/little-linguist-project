import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-game',
  standalone: true,
  imports: [MatTableModule,MatIconModule,CommonModule],
  templateUrl: './summary-game.component.html',
  styleUrl: './summary-game.component.css'
})
export class SummaryGameComponent implements OnInit {
  points: number = 0;
  results: { hebrew: string, english: string, success: boolean }[] = [];

  // שנה את router ל-public
  public router: Router;

  constructor(router: Router) {
    this.router = router; // אתחול ה-router
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      points: number;
      results: { hebrew: string; english: string; success: boolean }[];
    };

    // קבלת הנתונים מהמשחק
    if (state) {
      this.points = state.points;
      this.results = state.results;
    }
  }

  ngOnInit(): void {}
}