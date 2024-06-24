import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VolumeInfo } from '../../core/interfaces/books';
import { TruncateTextPipe } from '../../core/pipes/truncate-text.pipe';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TruncateTextPipe],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {
  book = input.required<VolumeInfo>();
  
  authors = computed(() => {
    const { authors } = this.book()
    return Object.values(authors);
  })
  
}
