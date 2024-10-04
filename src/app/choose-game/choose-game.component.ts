import {Component, Input, OnInit } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { GameService } from '../services/game.service';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SelecttCategoryDialogComponent } from '../selectt-category-dialog/selectt-category-dialog.component';
import { Router } from '@angular/router';
import { Category } from '../../shared/model/category';


@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [GameCardComponent,RouterModule,CommonModule,MatCardModule,MatDialogModule,SelecttCategoryDialogComponent,],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css'
})

export class ChooseGameComponent implements OnInit{
  allGames: GameProfile[] = [];

  constructor(
    public gameService: GameService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  async ngOnInit() {
    //this.allGames = await this.gameService.getGames();
    this.loadGames ()
  }

 

  loadGames() {
    this.allGames = []; // Reset the games array before loading new games
    this.gameService.getGames().then((games: GameProfile[]) => {
      const uniqueGames = games.filter((game, index, self) =>
        index === self.findIndex((g) => g.GameId === game.GameId)
      );
      this.allGames = uniqueGames;
    }).catch(error => {
      console.error("Error loading games: ", error);
    });
  }

  openDialog(game: GameProfile): void {
    const dialogRef = this.dialog.open(SelecttCategoryDialogComponent, {
      width: '400px',
      data: { game }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result && result.categoryId) {
        console.log('Navigating to:', game.GameUrl, result.categoryId);
        this.router.navigate([game.GameUrl, result.categoryId]);
      }
    });
  }
}