import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpProviderService } from '../../../services/http-provider.service';
import { Comment } from '../../../interfaces/Comment';
import { AvatarComponent } from '../../avatar/avatar.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-comments-management',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AvatarComponent,
    MatButtonModule,
  ],
  templateUrl: './comments-management.component.html',
  styleUrl: './comments-management.component.css',
})
export class CommentsManagementComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  commentsList: Comment[] = [];
  loading: boolean = true;
  selectedUser: any;
  dialogTitle: string = 'Confirmez vous la suppression ?';
  dialogSubtitle: string =
    'Si vous confirmer, ce commentaire sera supprimé definitivement';

  constructor(private httpProviderService: HttpProviderService) {}
  ngOnInit(): void {
    this.loadComments();
  }
  loadComments() {
    this.httpProviderService.getAllComments().subscribe(
      (res) => {
        this.commentsList = res.body || [];
        console.log('comments:', this.commentsList);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching comments:', error);
        this.loading = false;
      }
    );
  }
  openDialog(comment: Comment): void {
    this.dialog.open(ModalComponent, {
      width: 'auto',
      data: {
        dialogTitle: this.dialogTitle,
        dialogSubtitle: this.dialogSubtitle,
        onConfirm: () => this.onConfirmDelete(comment.id),
      },
    });
  }

  onConfirmDelete(commentId?: number): void {
    console.log('commentId to delete', commentId);
    if (commentId) {
      this.httpProviderService
        .deleteComment(commentId)
        .subscribe(() => this.loadComments());
    }
  }
}
