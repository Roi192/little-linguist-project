import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, inject } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import {MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SelecttCategoryDialogComponent } from '../selectt-category-dialog/selectt-category-dialog.component';



@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule,MatCardModule,RouterLink,MatDialogModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
  export class GameCardComponent {
  
    constructor(private dialog: MatDialog) {}
  
    openDialog (arg0:GameProfile) {
      throw new Error ('method not implemented')
    }
  @Input() currentGame!: GameProfile;
  }