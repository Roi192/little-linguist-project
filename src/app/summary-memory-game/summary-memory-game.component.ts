import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MemoryGameComponent } from '../memory-game/memory-game.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary-memory-game',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatTableModule,MemoryGameComponent],
  templateUrl: './summary-memory-game.component.html',
  styleUrl: './summary-memory-game.component.css'
})
export class SummaryMemoryGameComponent implements OnInit {
  points: number = 0; 
  matchedPairs: number = 0; 
  attempts: number = 0; 
  foundWords: { english: string; hebrew: string; success: boolean }[] = []; 
  displayedColumns: string[] = ['englishWord', 'hebrewWord', 'result'];
  public router: Router;

  constructor(private route: ActivatedRoute,  router: Router) {
    this.router = router; // אתחול של router
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      points: number;
      results: { english: string; category: string; success: boolean }[];
    };
  }

  ngOnInit(): void {
    // שימוש ב-query params לקבל את הנתונים
    this.route.queryParams.subscribe((params) => {
      this.points = +params['points'] || 0; 
      this.matchedPairs = +params['matchedPairs'] || 0;
      this.attempts = +params['attempts'] || 0;
      this.foundWords = JSON.parse(params['foundWords'] || '[]'); 
    });
  }
}