import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnChanges{
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();
  stars: number[] = Array(5).fill(0);

  ngOnChanges(): void {
    this.updateStars();
  }

  updateStars(): void {
    this.stars = this.stars.map((_, i) => {
      const starValue = i + 1;
      if (this.rating >= starValue) {
        return 1;
      } else if (this.rating > i && this.rating < starValue) {
        return 0.5;
      } else {
        return 0;
      }
    });
  }

  setRating(index: number): void {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
  }
}