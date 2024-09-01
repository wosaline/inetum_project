import { Component, inject, Input, model } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,

} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { CommentFromClient, CommentToClient } from '../../interfaces/comment';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    StarRatingComponent,
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})

export class CommentFormComponent {
  constructor(private httpProviderService: HttpProviderService, private router: Router) {}

  rating: number = 0.0;

  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<CommentFormComponent>);

  readonly errorDialog = inject(MatDialog);

  eventName: string = this.data.eventName || '';
  eventId: number = this.data.eventId || undefined;
  userId: number = this.data.userId || undefined;
  content: string ="";

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit():boolean{
    if(this.rating>0.0 && this.eventId && this.userId){
      const comment: CommentToClient = {
        eventId:this.eventId,
        userId:this.userId,
        content:this.content,
        rating:this.rating,
      }
      this.httpProviderService.createComment(comment).subscribe(
        (response) => {
          console.log('Comment added', response);
          return true;
        },
        (error) => {
          console.error("Error creating comment " + error.status)
          if(error.status==401){
              this.errorDialog.open(ErrorDialogComponent,{
                data: {errorMessage:"Vous n'avez pas accepté l'invitation, vous ne pouvez pas commenter cet événement."}
              });
          }else if(error.status==400){
            this.errorDialog.open(ErrorDialogComponent, {
              data: {errorMessage: "Vous n'avez pas été invité à cet événement."}
            })
          }
          return false;
        }
      )
    }
    this.dialogRef.close(this.rating);
    return false;
    

}

  onRatingChange(newRating: number): void {
    this.rating = newRating;
  }

}
