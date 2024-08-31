import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule,
  ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogError = inject(MatDialogRef<ErrorDialogComponent>);
  errorMessage: string = this.data.errorMessage || "";
}
