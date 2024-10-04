import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
  displayedColumns: string[] = ['english', 'category', 'success'];
  dataSource = new MatTableDataSource<any>();
  results: { hebrew: string, english: string, category: string, success: boolean }[] = [];

  public router: Router;

  constructor(router: Router) {
    this.router = router;
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      points: number;
      results: { hebrew: string; english: string; category: string; success: boolean }[];
    };

    if (state) {
      this.points = state.points;
      this.results = state.results;
      this.dataSource.data = this.results;
    }
  }

  ngOnInit(): void {}
}