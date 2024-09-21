import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { exitCodeFromResult } from '@angular/compiler-cli';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';


@Component({
  selector: 'app-words-sorter-game',
  standalone: true,
  imports: [ResultDialogComponent,MatDialog,FormsModule,ExitConfirmationDialogComponent],
  templateUrl: './words-sorter-game.component.html',
  styleUrl: './words-sorter-game.component.css'
})
export class WordsSorterGameComponent implements OnInit {
  @Input () id=""

  currentCategory?: Category;
  randomCategory?: Category;
  words: { word: string; belongsToCurrentCategory: boolean }[] = [];
  currentWordIndex: number = 0;
  currentWord: string = '';
  points: number = 0;
  totalPoints: number = 0;
  wordPoints: number = 0;
  progress: number = 0;
  
  constructor(
    public categoriesService: CategoriesService,
    public dialog: MatDialog,
    public router: Router,
    public route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectCategories();
    this.setupGame();
  }

  selectCategories(): void {
    const categories = this.categoriesService.get(); 
    const randomIndex = Math.floor(Math.random() * categories.length);
    this.randomCategory = categories[randomIndex];
    this.currentCategory = this.categoriesService.getCurrent();
  }

  setupGame(): void {
    const currentWords = this.currentCategory?.words
      ?.slice(0, 3)
      .map(word => ({ word: word.origin, belongsToCurrentCategory: true })) || []; // אם undefined, השתמש ברשימה ריקה
  
    const randomWords = this.randomCategory?.words
      ?.slice(0, 3)
      .map(word => ({ word: word.origin, belongsToCurrentCategory: false })) || []; // אם undefined, השתמש ברשימה ריקה
  
    this.words = this.shuffleWords([...currentWords, ...randomWords]);
    this.wordPoints = Math.floor(100 / this.words.length);
    this.loadNextWord();
  }

  shuffleWords(words: { word: string; belongsToCurrentCategory: boolean }[]): { word: string; belongsToCurrentCategory: boolean }[] {
    return words.sort(() => Math.random() - 0.5);
  }

  loadNextWord(): void {
    if (this.currentWordIndex < this.words.length) {
      this.currentWord = this.words[this.currentWordIndex].word;
      this.progress = ((this.currentWordIndex + 1) / this.words.length) * 100;
    } else {
      this.navigateToSummary();
    }
  }

  checkWord(isYes: boolean): void {
    const isSuccess = isYes === this.words[this.currentWordIndex].belongsToCurrentCategory;

    if (isSuccess) {
      this.totalPoints += this.wordPoints;
    }

    this.showResultDialog(isSuccess);
    this.currentWordIndex++;
    this.loadNextWord();
  }

  showResultDialog(isSuccess: boolean): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      data: { success: isSuccess },
    });

    dialogRef.afterClosed().subscribe(() => {
      // ניתן להוסיף פעולות נוספות לאחר סגירת הדיאלוג
    });
  }

  navigateToSummary(): void {
    this.router.navigate(['/summary'], { state: { points: this.totalPoints, results: this.words } });
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