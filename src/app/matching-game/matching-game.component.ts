import { Component, Input, OnInit } from '@angular/core';
import { TranslatedWord } from '../../shared/model/translated-word';
import { WordStatus } from '../../shared/model/Word-Status';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { GameService } from '../services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameResultService } from '../services/game-result.service';
import { CommonModule } from '@angular/common';
import { WordCardComponent } from "../word-card/word-card.component";
import { GameResult } from '../../shared/model/GameResult';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Category } from '../../shared/model/category';
import { GameProfile } from '../../shared/model/GameProfile';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [CommonModule, WordCardComponent,BrowserModule,
    FormsModule,],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css'
})
export class MatchingGameComponent implements OnInit {

  @Input() id = '';
  
  categories: Category[] = [];
  words: TranslatedWord[] = [];
  currentWord: TranslatedWord | null = null;
  score: number = 0;
  totalWords: number = 0;
  correctAnswers: number = 0;
  currentIndex: number = 0;

  constructor(
    private categoriesService: CategoriesService,
    private gameResultService: GameResultService,
    private dialogService: MatDialog,
    private gamesService: GameService,
    private route: ActivatedRoute,
    private router: Router,

  ) {}

  ngOnInit() {
    this.loadWords();
    this.loadCategories();
    this.addMatchingGame();
    this.gamesService.addDefaultGames(); // אם תרצה להוסיף משחקים ברירת מחדל
}

addMatchingGame() {
    const newGame: GameProfile = new GameProfile('game-4', 'Matching Game', 'Sort words into categories', '/matching-game');
    this.gamesService.addGame(newGame)
        .then(() => {
            console.log('Matching Game added successfully to Firestore');
        })
        .catch(error => {
            console.error('Error adding Matching Game to Firestore:', error);
        });
}
  loadCategories() {
    this.categoriesService.list().then((categories) => {
      this.categories = categories;
      console.log('Loaded categories:', this.categories);
    }).catch(error => {
      console.error('Error loading categories:', error);
    });
  }
  async loadWords() {
    try {
        const categories = await this.categoriesService.list();
        console.log('Loaded categories:', categories);
        // בדוק אם יש קטגוריות זמינות
        if (categories.length === 0) {
            console.warn('No categories available');
            return;
        }
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        this.words = randomCategory.words;
        this.totalWords = this.words.length;
        this.currentIndex = 0;
        this.nextWord();
    } catch (error) {
        console.error('Error loading words:', error);
    }
}
  nextWord() {
    if (this.currentIndex < this.totalWords) {
      this.currentWord = this.words[this.currentIndex];
    } else {
      this.finishGame();
    }
  }

  checkAnswer(guess: string) {
    if (guess.trim().toLowerCase() === this.currentWord?.target.toLowerCase()) {
      this.score += 1;
      this.correctAnswers += 1;
      this.showSuccessDialog();
    } else {
      this.showFailureDialog();
    }
    this.currentIndex++;
    this.nextWord();
  }

  finishGame() {
    const gameResult = new GameResult('', 'Matching Game', new Date(), this.score);
    this.gameResultService.addGameResult(gameResult);
    // הצגת סיכום המשחק
    this.showSuccessDialog(`סיימת את המשחק עם ${this.score} מתוך ${this.totalWords}`);
  }

  showSuccessDialog(message?: string) {
    this.dialogService.open(ResultDialogComponent, {
      data: { message: message || 'נכון!' }
    });
  }

  showFailureDialog() {
    this.dialogService.open(ResultDialogComponent, {
      data: { message: 'לא נכון, נסה שוב!' }
    });
  }
}