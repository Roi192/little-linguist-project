import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './exit-confirmation-dialog.component.html',
  styleUrl: './exit-confirmation-dialog.component.css'
})
export class ExitConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ExitConfirmationDialogComponent>) {}

  onConfirm(): void {
    // המשתמש אישר את היציאה
    this.dialogRef.close(true); // מחזיר true במידה ואישרו יציאה
  }

  onCancel(): void {
    // המשתמש ביטל את היציאה
    this.dialogRef.close(false); // מחזיר false במידה וביטלו יציאה
  }
}
