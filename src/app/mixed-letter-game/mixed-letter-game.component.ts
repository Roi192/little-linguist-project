import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SummaryGameComponent } from '../summary-game/summary-game.component';
import { PointsDisplayComponent } from '../points-display/points-display.component';
import { GameResultService } from '../services/game-result.service';
import { GameResult } from '../../shared/model/GameResult';
import { GameService } from '../services/game.service';





@Component({
  selector: 'app-mixed-letter-game',
  standalone: true,
  imports: [ExitConfirmationDialogComponent,FormsModule,MatIconModule,CommonModule,ResultDialogComponent,MatProgressBarModule,SummaryGameComponent],
  templateUrl: './mixed-letter-game.component.html',
  styleUrl: './mixed-letter-game.component.css',
})
export class MixedLetterGameComponent implements OnInit {

  @Input() id = '';

  categoryId?: string;
  currentCategory?: Category;
  currentWordIndex: number = 0;
  currentWord = { hebrewTranslation: '', englishWord: '' };
  shuffledLetters: string[] = [];
  userInput: string = '';
  points: number = 0;
  progress: number = 0;
  results: { hebrew: string, english: string, success: boolean }[] = [];
  totalPoints: number = 0;
  wordPoints: number = 0;
  shuffledWords: { target: string, origin: string }[] = [];
  dialogOpen: boolean = false;

  constructor(
    public categoriesService: CategoriesService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private gameResultService: GameResultService,
    private gameService: GameService // הוסף את GameService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.categoriesService.get(id).then((category) => {
        if (category) {
          this.currentCategory = category;
          this.wordPoints = Math.floor(100 / this.currentCategory.words.length);
          this.shuffleWords();
          this.setupNewWord();
        }
      }).catch(error => {
        console.error('Error fetching category:', error);
      });
    });
  }

  shuffleWords(): void {
    if (this.currentCategory?.words) {
      this.shuffledWords = [...this.currentCategory.words].sort(() => Math.random() - 0.5);
    }
  }

  setupNewWord(): void {
    if (this.shuffledWords && this.currentWordIndex < this.shuffledWords.length) {
      const randomWord = this.shuffledWords[this.currentWordIndex];
      this.currentWord = {
        hebrewTranslation: randomWord.target,
        englishWord: randomWord.origin
      };
      this.shuffledLetters = this.shuffleWord(randomWord.origin).split('');
    }
  }

  shuffleWord(word: string): string {
    let shuffled: string;
    do {
      shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
    } while (shuffled === word);
    return shuffled;
  }

  checkWord(): void {
    const isSuccess = this.userInput === this.currentWord.englishWord;

    if (this.currentCategory) {
      this.results.push({
        hebrew: this.currentWord.hebrewTranslation,
        english: this.currentWord.englishWord,
        success: isSuccess
      });

      if (isSuccess) {
        this.totalPoints += this.wordPoints;
      }

      this.showResultDialog(isSuccess);
      this.progress = ((this.currentWordIndex + 1) / this.currentCategory.words.length) * 100;

      this.currentWordIndex++;

      if (this.currentWordIndex < this.currentCategory.words.length) {
        this.setupNewWord();
      } else {
        if (this.totalPoints === this.wordPoints * this.currentCategory.words.length) {
          this.totalPoints = 100;
        }
        this.navigateToSummary();
      }
    } else {
      console.error('currentCategory is undefined');
    }
  }

  navigateToSummary(): void {
    const currentGameId = 'game-1'; // קביעת ה-ID ל-'game-1'

    const gameResult = new GameResult(
      this.currentCategory?.id || '',
      currentGameId, // השתמש ב-ID המוגדר
      new Date(),
      this.totalPoints
    );

    this.gameResultService.addGameResult(gameResult).then(() => {
      console.log('Game result added successfully');
      this.router.navigate(['/summary'], { state: { points: this.totalPoints, results: this.results } });
    }).catch(error => {
      console.error('Error adding game result:', error);
    });
}

  private generateUniqueId(): string {
    // Implementation of ID generation logic
    return 'generated-unique-id'; // Example placeholder
  }

  showResultDialog(isSuccess: boolean): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      data: { success: isSuccess }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.results.length === this.currentCategory?.words.length) {
        this.router.navigate(['/summary'], { state: { points: this.totalPoints, results: this.results } });
      }
    });
  }

  resetInput(): void {
    this.userInput = '';
  }

  confirmExit(): void {
    const dialogRef = this.dialog.open(ExitConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['/choose-game']);
      }
    });
  }
}