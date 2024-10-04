import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GameResultService } from '../services/game-result.service';
import { GameService } from '../services/game.service';
import { GameResult } from '../../shared/model/GameResult';



@Component({
  selector: 'app-words-soreter-game',
  standalone: true,
  imports: [ExitConfirmationDialogComponent,FormsModule,MatIconModule,CommonModule,ResultDialogComponent,MatProgressBarModule,],
  templateUrl: './words-sorter-game.component.html',
  styleUrl: './words-sorter-game.component.css',
})


  export class WordsSorterGameComponent implements OnInit {
    @Input() id = '';

    categories: Category[] = [];
    currentCategory?: Category;
    randomCategory?: Category;
    selectedWords: { english: string; hebrew: string }[] = [];
    shuffledWords: { english: string; hebrew: string }[] = [];
    currentWordIndex: number = 0;
    points: number = 0;
    wordPoints: number = 0;
    totalWords: number = 6; // Total number of words
    progress: number = 0;
    summaryWords: { english: string; category: string; success: boolean }[] = [];
  
    constructor(
      private categoriesService: CategoriesService,
      private route: ActivatedRoute,
      private router: Router,
      private dialog: MatDialog,
      private gameService: GameService,
      private gameResultService: GameResultService
    ) {}
  
    ngOnInit() {
      this.categoriesService.list().then((categories) => {
        this.categories = categories;
        this.currentCategory = this.categories.find(
          (cat) => cat.id === this.route.snapshot.params['id']
        );
        this.selectWordsForGame(); // Select words for the game
        this.shuffleWords(); // Shuffle the words
        this.totalWords = this.shuffledWords.length; // Update totalWords here
        console.log(this.shuffledWords);
        this.calculateWordPoints(); // Calculate points per word
      });
    }
  
    getRandomCategory(): Category {
      let newCategory;
      do {
        const shuffledCategories = this.categories
          .filter((cat) => cat.id !== this.currentCategory?.id) // Filter out the selected category
          .sort(() => Math.random() - 0.5); // Shuffle categories
  
        newCategory = shuffledCategories[0]; // Pick the first category from shuffled list
      } while (newCategory.id === this.currentCategory?.id);
  
      return newCategory;
    }
  
    selectWordsForGame() {
      this.randomCategory = this.getRandomCategory(); // Get a random category
      const currentCategoryWords = this.getRandomWordsFromCategory(this.currentCategory!, 3);
      const randomCategoryWords = this.getRandomWordsFromCategory(this.randomCategory, 3);

      if (currentCategoryWords.length < 3 || randomCategoryWords.length < 3) {
        console.error('Not enough words in one of the categories to start the game.');
        return; 
      }
  
      this.selectedWords = [...currentCategoryWords, ...randomCategoryWords];
    }
  
    getRandomWordsFromCategory(category: Category, count: number) {
      return category.words
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .map((word) => ({ english: word.origin, hebrew: word.target }));
    }
  
    shuffleWords() {
      this.shuffledWords = [...this.selectedWords].sort(() => Math.random() - 0.5);
    }
  
    calculateWordPoints() {
      this.wordPoints = Math.floor(100 / this.shuffledWords.length);
    }
  
    checkAnswer(isYes: boolean) {
      const currentWord = this.shuffledWords[this.currentWordIndex];
      const isCorrect = (this.currentCategory?.words.some((word) => word.origin === currentWord.english)) === isYes;

      const category = this.currentCategory?.words.some((word) => word.origin === currentWord.english)
      ? this.currentCategory?.name
      : this.randomCategory?.name;
  
      this.summaryWords.push({
        english: currentWord.english,
       category: category || '',
        success: isCorrect,
      });
  
      this.openResultDialog(isCorrect); // Open result dialog
  
      if (isCorrect) {
        this.points += this.wordPoints;
      }
  
      this.currentWordIndex++;
  
      // Update progress
      this.progress = (this.currentWordIndex / this.shuffledWords.length) * 100; // Update progress
  
      if (this.currentWordIndex >= this.shuffledWords.length) {
        if (this.summaryWords.every(word => word.success)) {
          this.points = 100;
        }
        this.navigateToSummary();
      }
    }
  
    openResultDialog(success: boolean) {
      this.dialog.open(ResultDialogComponent, {
        data: { success },
      });
    }
  
    navigateToSummary(): void {
      const currentGameId = 'game-2'; // קביעת ה-ID ל-'game-2'
  
      const gameResult = new GameResult(
        this.currentCategory?.id || '',
        currentGameId, // השתמש ב-ID המוגדר
        new Date(),
        this.points
      );
  
      this.gameResultService.addGameResult(gameResult).then(() => {
        console.log('Game result added successfully');
       // this.router.navigate(['/summary-sort-word'], { state: { points: this.points, results: this.summaryWords } }); // עדכן ל-summaryWords
       this.router.navigate(['/summary-sort-word'], { state: { points: this.points, results: this.summaryWords } });
      }).catch((error) => {
        console.error('Error adding game result:', error);
      });
    }
  
    confirmExit(): void {
      const dialogRef = this.dialog.open(ExitConfirmationDialogComponent);
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.router.navigate(['/choose-game']);
        }
      });
    }
  }