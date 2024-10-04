import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc, writeBatch } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  allgames: any;
  constructor(private firestore: Firestore) {}
  private currentGameId: string | null = null;

  setCurrentGameId(gameId: string) {
    this.currentGameId = gameId;
  }

  getCurrentGameId(): string | null {
    if (!this.currentGameId) {
      console.warn('Current game ID is not set!');
    }
    return this.currentGameId;
  }


  // מתודה להחזרת המשחקים מתוך Firestore
  getGames(): Promise<GameProfile[]> {
    const gamesCollection = collection(this.firestore, 'games');
    return getDocs(gamesCollection).then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data() as GameProfile;
        return { ...data, GameId: doc.id }; // משייכים את ה-ID של המסמך מה-Firestore ל-GameId
      });
    });
  }

  // מתודה להוספת משחק ל-Firestore
  addGame(game: GameProfile) {
    const gamesCollection = collection(this.firestore, 'games');
    return addDoc(gamesCollection, { ...game });
  }

  // כאן נוסיף את כל המשחקים שהיו לך
  addDefaultGames() {
    const defaultGames: GameProfile[] = [
      new GameProfile("game1", 'Word Sorting', 'Sort words into categories', '/word-sorter'),
      new GameProfile('game2', 'Mixed Letter', 'Arrange jumbled letters to form words', '/mixed-letter'),
      new GameProfile('game3', 'Trivia', 'Choose every words translation from a list of 4 options', '/Trivia'),
   ];

    defaultGames.forEach((game) => {
      this.addGame(game)
        .then(() => {
          console.log(`Game ${game.GameName} added successfully`);
        })
        .catch((error) => {
          console.error(`Error adding game ${game.GameName}:`, error);
        });
    });
  }


  // מתודה לעדכון משחק קיים ב-Firestore
  updateGame(gameId: string, game: Partial<GameProfile>): Promise<void> {
    const { GameId, ...gameData } = game; // מסננים את ה-GameId שלא נרצה לעדכן
    return updateDoc(doc(this.firestore, 'games', gameId), gameData);
  }

  // מתודה למחיקת משחק מ-Firestore
  deleteGame(gameId: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'games', gameId));
  }
}