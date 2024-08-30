import { Component, Inject, Input, input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [MatDialogModule],
  standalone: true,
})
export class ModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogTitle: string;
      dialogSubtitle: string;
      onConfirm: () => void;
    }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
