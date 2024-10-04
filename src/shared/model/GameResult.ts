import { Timestamp } from "@angular/fire/firestore";


export class GameResult {
  categoryId: string;  // מזהה הקטגוריה
  gameId: string;      // מזהה המשחק
  date: Date;          // תאריך המשחק
  points: number;      // כמות נקודות

  constructor(categoryId: string, gameId: string, date: Date, points: number) {
    this.categoryId = categoryId;
    this.gameId = gameId;
    this.date = date instanceof Timestamp ? date.toDate() : new Date(date);;
    this.points = points;
  }
}