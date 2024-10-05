import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Card } from '../../shared/model/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-trivia-game',
  standalone: true,
  imports: [RouterModule,RouterLink,MatTableModule],
  templateUrl: './trivia-game.component.html',
  styleUrl: './trivia-game.component.css'
})
export class TriviaGameComponent   {
}

 