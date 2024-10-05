import { Component, OnInit,Input } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { GameProfile } from '../../shared/model/GameProfile';
import { GameResultService } from '../services/game-result.service';
import { SelecttCategoryDialogComponent } from '../selectt-category-dialog/selectt-category-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GameResult } from '../../shared/model/GameResult';
import { MatCardModule } from '@angular/material/card';


export interface Word {
  origin: string; // המילה באנגלית
  target: string; // המילה בעברית
  matched?: boolean; // האם הכרטיסיה הותאמה
  flipped?: boolean; // האם הכרטיסיה הופכה
}
@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,ResultDialogComponent,MatProgressBarModule,MatCardModule],
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.css'
})
export class MemoryGameComponent implements OnInit {

  @Input() id = '';

  categories: Category[] = [];
  currentCategory?: Category;
  selectedWords: Word[] = [];
  shuffledWords: Word[] = [];
  firstCardIndex: number | null = null;
  secondCardIndex: number | null = null;
  matchedPairs: number = 0;
  totalPairs: number = 0;
  canFlip: boolean = true;
  points: number = 100; // ניקוד התחלתי
  foundWords: { english: string; hebrew: string; success: boolean }[] = [];
  attempts: number = 0; // מספר הניסיונות
  results: { hebrew: string; english: string; success: boolean }[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private gamesService: GameService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private gameResultService: GameResultService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.addMemoryGame();
    this.initializeCurrentCategory();
  }

  loadCategories() {
    this.categoriesService.list().then((categories) => {
      this.categories = categories;
      console.log('Loaded categories:', this.categories);
    }).catch(error => {
      console.error('Error loading categories:', error);
    });
  }

  addMemoryGame() {
    const newGame: GameProfile = new GameProfile('game-3', 'memory-game', 'Sort words into categories', '/memory-game');
    this.gamesService.addGame(newGame)
      .then(() => {
        console.log('Memory Game added successfully to Firestore');
      })
      .catch(error => {
        console.error('Error adding memory Game to Firestore:', error);
      });
  }

  initializeCurrentCategory() {
    this.categoriesService.list().then((categories) => {
      this.categories = categories;
      this.currentCategory = this.categories.find(
        (cat) => cat.id === this.route.snapshot.params['id']
      );
      if (this.currentCategory) {
        this.setCategory(this.currentCategory);
      }
      console.log('Current category:', this.currentCategory);
    });
  }

  setCategory(category: Category) {
    this.currentCategory = category;
    this.selectWordsForGame();
    this.shuffleWords();
    this.totalPairs = this.shuffledWords.length / 2;
  }

  selectWordsForGame() {
    if (!this.currentCategory) {
      console.warn('No category selected!');
      return;
    }

    const currentCategoryWords = this.getRandomWordsFromCategory(this.currentCategory, 8);
    console.log('Selected words for game:', currentCategoryWords);

    this.selectedWords = [
      ...currentCategoryWords.map(word => ({ origin: word.origin, target: word.target, matched: false, flipped: false })),
      ...currentCategoryWords.map(word => ({ origin: word.target, target: word.origin, matched: false, flipped: false }))
    ];

    this.shuffleWords();
  }

  shuffleWords() {
    this.shuffledWords = this.selectedWords.sort(() => Math.random() - 0.5);
    console.log('Shuffled words:', this.shuffledWords);
  }

  getRandomWordsFromCategory(category: Category, count: number) {
    return category.words
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  flipCard(index: number) {
    if (!this.canFlip || index === this.firstCardIndex || this.shuffledWords[index].matched) {
      return;
    }

    this.shuffledWords[index].flipped = true; // הופכים את הכרטיסיה
    
    if (this.firstCardIndex === null) {
      this.firstCardIndex = index;
    } else {
      this.secondCardIndex = index;
      this.canFlip = false;
      this.checkForMatch();
    }
  }

  checkForMatch() {
    const firstCard = this.shuffledWords[this.firstCardIndex!];
    const secondCard = this.shuffledWords[this.secondCardIndex!];
  
    if (firstCard.origin === secondCard.target) { // בדיקת התאמה
      this.matchedPairs++;
      firstCard.matched = true;
      secondCard.matched = true;

      // הוספת מילות ההתאמה בצורה הנכונה ל-foundWords
      this.foundWords.push({
        english: firstCard.origin, // מילה באנגלית
        hebrew: secondCard.target, // מילה בעברית
        success: true
      });

      this.resetFlip();
  
      if (this.matchedPairs === this.totalPairs) {
        this.endGame(); // נווט למסך הסיכום
      }
    } else {
      this.attempts++; 
      if (this.points > 0) {
        this.points -= 2;
      } else {
        this.points = 0;
      }
      
      setTimeout(() => {
        firstCard.flipped = false; // ההיפוך חוזר
        secondCard.flipped = false;
        this.resetFlip();
      }, 1000);
    }
  }

  resetFlip() {
    this.firstCardIndex = null;
    this.secondCardIndex = null;
    this.canFlip = true;
  }

  openResultDialog(success: boolean) {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      data: { success, points: this.points },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/choose-game']);
    });
  }

  confirmExit(): void {
    const dialogRef = this.dialog.open(ExitConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/choose-game']);
      }
    });
  }

  endGame() {
    const gameResult: GameResult = {
      categoryId: this.currentCategory?.id || '',
      gameId: 'game-3',
      date: new Date(),
      points: this.points,
    };

    this.gameResultService.addGameResult(gameResult);

    // ניווט למסך הסיכום עם העברת הפרמטרים
    this.router.navigate(['/summary-memory-game'], {
      queryParams: {
        points: this.points,
        matchedPairs: this.matchedPairs,
        attempts: this.attempts,
        foundWords: JSON.stringify(this.foundWords),
      },
    });
  }
}