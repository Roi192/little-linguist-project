import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, writeBatch } from '@angular/fire/firestore';
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
      const uniqueGames: { [key: string]: GameProfile } = {};
      
      snapshot.docs.forEach(doc => {
        const data = doc.data() as GameProfile;
        const gameId = doc.id;
  
        // מסנן כפילויות לפי GameId
        if (!uniqueGames[gameId]) {
          uniqueGames[gameId] = { ...data, GameId: gameId };
        }
      });
  
      return Object.values(uniqueGames);
    });
  }

  // מתודה להוספת משחק ל-Firestore
  async addGame(game: GameProfile) {
    const gamesCollection = collection(this.firestore, 'games');
    const gameDocs = await getDocs(gamesCollection);
    
    // בדיקת אם המשחק קיים לפי GameName (אפשר לבדוק גם לפי GameId או ליצור ID ייחודי)
    const existingGame = gameDocs.docs.find(doc => doc.data()['GameName'] === game.GameName);
    if (!existingGame) {
        await addDoc(gamesCollection, { ...game });
        console.log(`Game ${game.GameName} added successfully`);
    } else {
        console.log(`Game ${game.GameName} already exists, not adding.`);
    }
}

  // כאן נוסיף את כל המשחקים שהיו לך
  
  
    addDefaultGames() {
      const defaultGames: GameProfile[] = [
        new GameProfile("game1", 'Word Sorting', 'Sort words into categories', '/word-sorter'),
        new GameProfile('game2', 'Mixed Letter', 'Arrange jumbled letters to form words', '/mixed-letter'),
        new GameProfile('game3', 'Trivia', 'Choose every words translation from a list of 4 options', '/Trivia'),
      ];
  
      defaultGames.forEach(async (game) => {
          const existingGames = await this.getGames();
          const gameExists = existingGames.some(existingGame => existingGame.GameName === game.GameName);
          
          if (!gameExists) {
              await this.addGame(game);
              console.log(`Game ${game.GameName} added successfully`);
          } else {
              console.log(`Game ${game.GameName} already exists, skipping addition.`);
          }
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
  getGameById(gameId: string): Promise<GameProfile | null> {
    const gameDoc = doc(this.firestore, 'games', gameId);
    return getDoc(gameDoc).then(doc => {
      if (doc.exists()) {
        const data = doc.data() as GameProfile;
        return { ...data, GameId: doc.id }; // משייכים את ה-ID של המסמך מה-Firestore ל-GameId
      } else {
        console.warn(`No such game with ID: ${gameId}`);
        return null; // במקרה שאין משחק
      }
    });
  }
}
