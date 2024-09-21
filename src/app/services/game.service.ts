import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // מערך פרטי המשחקים
  private allgames: GameProfile[] = [
    new GameProfile(1, 'Word Sorting', 'Sort words into categories', '/word-sorter',),
    new GameProfile(2, 'Mixed Letter', 'Arrange jumbled letters to form words', '/mixed-letter',),
    new GameProfile(3, 'Trivia', 'Choose every words translation from a list of 4 option', '/Trivia',),
  ];
  constructor() { }
  // מתודה להחזרת המשחקים
  list ():GameProfile []{
    return this.allgames
  }
  getGames(): GameProfile[] {
    return this.allgames;
  }
}
