import { Injectable } from '@angular/core';
import { DocumentSnapshot, Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { GameResult } from '../../shared/model/GameResult';
import { gameresultconverter } from './converter/game-result-convert';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  private collectionName = 'GameResult'

  constructor(private firestore: Firestore) { }

  async addGameResult(gameResult: GameResult): Promise<void> {
    await addDoc(
      collection(this.firestore, this.collectionName).withConverter(gameresultconverter),
      gameResult
    );
  }

  async list(): Promise<GameResult[]> {
    const gameResultCollection = collection(this.firestore, this.collectionName).withConverter(gameresultconverter);
    const querySnapshot = await getDocs(gameResultCollection);
    const gameResults: GameResult[] = [];
    querySnapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      if (data) {
        gameResults.push(data);
      }
    });
    return gameResults;
  }
}