import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpProviderService } from '../../services/http-provider.service';
import { Comment } from '../../interfaces/comment';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    StarRatingComponent,
  ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent{

  @Input() comment!:Comment;

}
