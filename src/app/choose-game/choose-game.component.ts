import { Component, Input, OnInit } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { GameService } from '../services/game.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [GameCardComponent,RouterModule,CommonModule,MatCardModule],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css'
})
export class ChooseGameComponent implements OnInit{
openGameDialog() {
throw new Error('Method not implemented.');
}
  allgames : GameProfile[]=[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.allgames = this.gameService.getGames();

}
}
