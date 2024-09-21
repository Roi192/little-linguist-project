import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,CommonModule],
  templateUrl: './result-dialog.component.html',
  styleUrl: './result-dialog.component.css'
})
export class ResultDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { success: boolean }) {}
}

