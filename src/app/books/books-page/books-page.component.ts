import { Component, OnInit } from '@angular/core';
import { BookItemComponent } from '../book-item/book-item.component';
import { Observable } from 'rxjs';
import { BookItem, BookResults } from '../../core/interfaces/books';
import { BooksService } from '../../core/services/books.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatGridListModule, BookItemComponent],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent implements OnInit {

  public booksResults$!: Observable<BookResults>;
  public currentPage: number = 0;
  public pageSize: number = 20;
  public booksData?: BookItem[];

  constructor(private booksService: BooksService) { };

  ngOnInit(): void {
      this.searchBooks('mistborn')
  }

  handlePageEvent(pageEvent: PageEvent, bookName) {
    console.log('handlePageEvent', pageEvent);
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.searchBooks(bookName)
  }

  onKeyUp(event: KeyboardEvent, bookName) {
    if (event.keyCode === 13 || event.key === 'Enter') {
      this.currentPage = 0;
      this.searchBooks(bookName)
    }
  }

  onClickSearch(bookName) {
    this.currentPage = 0;
    this.searchBooks(bookName)
  }

  searchBooks(bookName) {
    this.booksData = []
    this.booksService.getBooks(bookName, this.pageSize, this.currentPage).subscribe(
      {
        next: (data: BookResults) => {
          this.booksData = data.items;
          console.log(this.booksData);
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
}
