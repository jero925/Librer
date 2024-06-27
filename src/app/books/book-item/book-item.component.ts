import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VolumeInfo } from '../../core/interfaces/books';
import { TruncateTextPipe } from '../../core/pipes/truncate-text.pipe';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from '../book-detail/book-detail.component';


@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TruncateTextPipe],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {

  public book = input.required<VolumeInfo>();

  public authors = computed(() => {
    const { authors } = this.book()
    return Object.values(authors);
  })

  constructor(private dialog: MatDialog) { }

  viewBookDetail(bookData): void {
    this.dialog.open(BookDetailComponent, {
      maxWidth: '700px',
      data: bookData
    });
  }
}
