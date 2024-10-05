import { Component, OnInit } from '@angular/core';
import { GameResultService } from '../services/game-result.service';
import { GameResult } from '../../shared/model/GameResult';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CategoriesService } from '../services/categories.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [  CommonModule,MatCardModule ],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {
  totalPoints: number = 0;
  gamesPlayed: number = 0;
  averagePoints: number = 0;
  highestScoreAvg: { gameName: string; averagePoints: number } | null = null;
  lowestScoreAvg: { gameName: string; averagePoints: number } | null = null;
  categoriesLearned: number = 0;
  categoriesNotLearned: number = 0;
  perfectGamePercentage: number = 0;
  mostPlayedCategory: string = '';
  monthlyChallengeGamesPlayed: number = 0;
  gamesToCompleteChallenge: number = 0;
  monthlyChallengeCompleted: boolean = false;

  // Number of consecutive days games were played
  consecutiveDaysPlayed: number = 0;

  // Mapping between gameId and game names
  gameNamesMap: { [key: string]: string } = {
    'game-1': 'Mixed Letters',
    'game-2': 'Word Sorter',
    'game-3': 'Memory Game'
    // Add more mappings as per your games
  };

  constructor(
    private gameResultService: GameResultService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const [results, categories] = await Promise.all([
      this.gameResultService.list(),
      this.categoryService.list()
    ]);
    this.calculateMetrics(results, categories);
    this.calculateConsecutiveDays(results); // Calculate consecutive days
  }

  calculateMetrics(results: GameResult[], categories: any[]) {
    this.gamesPlayed = results.length;
    this.totalPoints = results.reduce((acc, result) => acc + result.points, 0);
    this.averagePoints = this.gamesPlayed > 0 ? this.totalPoints / this.gamesPlayed : 0;

    const gameTypeScores: { [gameId: string]: { totalPoints: number; count: number } } = {};
    const categoriesSet = new Set<string>();
    const categoryPlayCount: { [categoryId: string]: number } = {};
    let perfectGamesCount = 0;

    // Monthly challenge - count how many games were played this month
    const currentMonthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthlyChallengeTarget = 20;

    results.forEach(result => {
      const gameId = result.gameId;
      const categoryId = result.categoryId;
      const resultDate = result.date instanceof Timestamp ? result.date.toDate() : result.date; 
      categoriesSet.add(categoryId);

      if (!gameTypeScores[gameId]) {
        gameTypeScores[gameId] = { totalPoints: 0, count: 0 };
      }
      gameTypeScores[gameId].totalPoints += result.points;
      gameTypeScores[gameId].count++;

      if (!categoryPlayCount[categoryId]) {
        categoryPlayCount[categoryId] = 0;
      }
      categoryPlayCount[categoryId]++;

      if (result.points === 100) {
        perfectGamesCount++;
      }

      // Count the games played this month
      if (resultDate >= currentMonthFirstDay) {
        this.monthlyChallengeGamesPlayed++;
      }
    });

    this.categoriesLearned = categoriesSet.size;
    this.categoriesNotLearned = categories.length - this.categoriesLearned;
    this.perfectGamePercentage = this.gamesPlayed > 0 ? (perfectGamesCount / this.gamesPlayed) * 100 : 0;

    let mostPlayedCategoryId = '';
    let mostPlayedCount = 0;
    for (const categoryId in categoryPlayCount) {
      if (categoryPlayCount[categoryId] > mostPlayedCount) {
        mostPlayedCount = categoryPlayCount[categoryId];
        mostPlayedCategoryId = categoryId;
      }
    }

    const mostPlayedCategory = categories.find(category => category.id === mostPlayedCategoryId);
    this.mostPlayedCategory = mostPlayedCategory ? mostPlayedCategory.name : 'Unknown';

    let highestAvg = -Infinity;
    let highestAvgGameId = '';
    let lowestAvg = Infinity;
    let lowestAvgGameId = '';

    for (const gameId in gameTypeScores) {
      const avgScore = gameTypeScores[gameId].totalPoints / gameTypeScores[gameId].count;
      if (avgScore > highestAvg) {
        highestAvg = avgScore;
        highestAvgGameId = gameId;
      }
      if (avgScore < lowestAvg) {
        lowestAvg = avgScore;
        lowestAvgGameId = gameId;
      }
    }

    this.highestScoreAvg = {
      gameName: this.gameNamesMap[highestAvgGameId] || highestAvgGameId,
      averagePoints: highestAvg
    };

    this.lowestScoreAvg = {
      gameName: this.gameNamesMap[lowestAvgGameId] || lowestAvgGameId,
      averagePoints: lowestAvg
    };

    // Monthly challenge
    this.gamesToCompleteChallenge = monthlyChallengeTarget - this.monthlyChallengeGamesPlayed;
    this.monthlyChallengeCompleted = this.monthlyChallengeGamesPlayed >= monthlyChallengeTarget;
  }

  // Calculate consecutive days played
  private calculateConsecutiveDays(results: GameResult[]) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    let daysCount = 0;

    while (true) {
      const gamesOnDate = results.filter(result => {
        const resultDate = result.date instanceof Timestamp ? result.date.toDate() : result.date;
        return (
          resultDate.getFullYear() === yesterday.getFullYear() &&
          resultDate.getMonth() === yesterday.getMonth() &&
          resultDate.getDate() === yesterday.getDate()
        );
      });

      if (gamesOnDate.length > 0) {
        daysCount++;
      } else {
        break; // Stop if no games were played on the current date
      }

      yesterday.setDate(yesterday.getDate() - 1); // Go to the previous day
    }

    this.consecutiveDaysPlayed = daysCount; // Save the result
  }
}