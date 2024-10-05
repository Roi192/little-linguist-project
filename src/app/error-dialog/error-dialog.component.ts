import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },private dialogRef: MatDialogRef<ErrorDialogComponent>, private router: Router)
  {}
  closeDialogAndNavigate() {
    this.dialogRef.close();
    this.router.navigate(['/choose-game']);
  }
}


