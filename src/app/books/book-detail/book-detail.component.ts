import { Component, OnInit, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { VolumeInfo } from '../../core/interfaces/books';
import { MatGridListModule, MatGridTileText } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NotionBooksService } from '../../core/services/notion-books.service';
import { NotionBookItem } from '../../core/interfaces/notion_books/notion-books';
import { BooksService } from '../../core/services/books.service';
import { NotionBookOptionsResults } from '../../core/interfaces/notion_books/select_options';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatGridListModule, MatGridTileText, MatIconModule, MatFormFieldModule, MatSelectModule, AsyncPipe],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  public existeLibro: boolean = false

  readonly data = inject<VolumeInfo>(MAT_DIALOG_DATA);
  public authors = computed(() => {
    const { authors } = this.data
    return Object.values(authors);
  })

  public notionBookData?: NotionBookItem
  public isbn13: string | null

  public comboBoxValues: NotionBookOptionsResults
  public comboPuntaje: string;
  public comboEstado: string;

  constructor(private notionBookService: NotionBooksService, private bookService: BooksService) { }

  ngOnInit(): void {
    this.isbn13 = this.bookService.getISBN_13(this.data)
    this.notionBookService.getBookByISBN13(this.isbn13).subscribe((res => {
      this.existeLibro = true;
      this.notionBookData = res

      this.getComboBoxValues()
      
    }))
  }
  
  getComboBoxValues() {
    this.notionBookService.getSelectOptions().subscribe((res: NotionBookOptionsResults) => {
      this.comboBoxValues = res
      const { Estado } = this.notionBookData
      this.comboEstado = Estado.id
      
    })
  }
}
