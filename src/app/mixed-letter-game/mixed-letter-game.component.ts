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
  currentWordIndex: number = 0; // ניהול האינדקס הנוכחי של המילה
  currentWord = { hebrewTranslation: '', englishWord: '' };
  shuffledLetters: string[] = [];
  userInput: string = '';
  points: number = 0; // ניקוד
  progress: number = 0; // פרוגרס בר
  results: { hebrew: string, english: string, success: boolean }[] = [];
  totalPoints: number = 0;
  wordPoints: number = 0;
  shuffledWords: { target: string, origin: string }[] = [];


  constructor(
    public categoriesService: CategoriesService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.categoriesService.get(id).then((category) => {
        if (category) {
          this.currentCategory = category; // הגדרת הקטגוריה הנוכחית
          this.wordPoints = Math.floor(100 / this.currentCategory.words.length); // חישוב הניקוד לכל מילה
          this.shuffleWords(); // ערבוב המילים
          this.setupNewWord(); // הגדרת המילה הראשונה
        }
      }).catch(error => {
        console.error('Error fetching category:', error);
      });
    });
  }
    

    //  if (this.currentCategory) {
      //  this.wordPoints = Math.floor(100 / this.currentCategory.words.length);
        //this.shuffleWords();
        //this.setupNewWord();
      //}
    //};
  //}
  shuffleWords(): void {
    if (this.currentCategory?.words) {
      this.shuffledWords = [...this.currentCategory.words].sort(() => Math.random() - 0.5); // ערבוב המילים בקטגוריה
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
    } while (shuffled === word); // אם הערבוב זהה למילה המקורית, נבצע ערבוב מחדש
    return shuffled;
  }

  checkWord(): void {
    const isSuccess = this.userInput === this.currentWord.englishWord;
  
    // הוסף את התוצאה למערך
    if (this.currentCategory) {
      this.results.push({
        hebrew: this.currentWord.hebrewTranslation,
        english: this.currentWord.englishWord,
        success: isSuccess
      });
  
      if (isSuccess) {
        this.totalPoints += this.wordPoints; // עדכון הנקודות
      }
  
      this.showResultDialog(isSuccess); // הצגת דיאלוג הצלחה או כישלון
  
      // עדכון ה-Progress Bar
      this.progress = ((this.currentWordIndex + 1) / this.currentCategory.words.length) * 100; 
  
      // הכנה למילה הבאה
      this.currentWordIndex++;
      
      if (this.currentWordIndex < this.currentCategory.words.length) {
        this.setupNewWord();
      } else {
        this.navigateToSummary(); // ניווט למסך סיכום
      }
    } else {
      console.error('currentCategory is undefined');
    }
  }

  showResultDialog(isSuccess: boolean): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      data: { success: isSuccess }
    });

    dialogRef.afterClosed().subscribe(() => {
      // בדוק אם כל המילים הוצגו
      if (this.results.length === this.currentCategory?.words.length) {
        this.router.navigate(['/summary'], { state: { points: this.totalPoints, results: this.results } });
      }
    });
  }

  resetInput(): void {
    this.userInput = '';
  }
  navigateToSummary(): void {
    this.router.navigate(['/summary'], { state: { points: this.totalPoints, results: this.results } });
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