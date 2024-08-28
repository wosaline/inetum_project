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
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Event } from '../../interfaces/event';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { Comment } from '../../interfaces/comment';
import { Router } from '@angular/router';

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

  eventName: string = this.data.eventName || '';
  eventId: number = this.data.eventId || undefined;
  userId: number = this.data.userId || undefined;
  content: string ="";

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit():boolean{
    console.log(this.rating + " " + this.eventId + " " + this.userId)
    if(this.rating>0.0 && this.eventId && this.userId){
      const comment: Comment = {
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
