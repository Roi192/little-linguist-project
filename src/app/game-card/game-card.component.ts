import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, inject } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SelecttCategoryDialogComponent } from '../selectt-category-dialog/selectt-category-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule,MatCardModule,RouterLink,MatDialog],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class GameCardComponent {
 
  //openDialog(arg0:GameProfile) {
    //throw new Error ('method not implememnted');
  //}
  @Input() currentgame ?:GameProfile;

  constructor(public dialog:MatDialog){}

  openCategoryDialog():void{
    const dialogRef =this.dialog.open(SelecttCategoryDialogComponent,{
      data:{game:this.currentgame}
    });
    //dialogRef.afterClosed().subscribe(result)
  }

  }
