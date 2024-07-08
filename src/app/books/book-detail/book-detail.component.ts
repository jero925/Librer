import { Component, OnInit, computed, effect, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { VolumeInfo } from '../../core/interfaces/books';
import {
  MatGridListModule,
  MatGridTileText,
} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NotionBooksService } from '../../core/services/notion-books.service';
import { NotionBookItem } from '../../core/interfaces/notion_books/notion-books';
import { BooksService } from '../../core/services/books.service';
import {
  NotionBookOptionsResults,
  SelectNombre,
  SelectOption,
} from '../../core/interfaces/notion_books/select_options';
import { AsyncPipe, formatDate } from '@angular/common';
import { NewBook } from '../../core/interfaces/notion_books/create_book';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { convertStringToDate } from '../../shared/utils/string-to-date';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatGridListModule,
    MatGridTileText,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent implements OnInit {
  public existeLibro: boolean = false;
  public isEnded: boolean = false;

  readonly data = inject<VolumeInfo>(MAT_DIALOG_DATA);
  public authors = computed(() => {
    const { authors } = this.data;
    return Object.values(authors);
  });

  public notionBookData?: NotionBookItem;
  public isbn13: string | null;

  //Fechas
  selectedStartDate = signal<string>('')

  //Inicialización de FormControl
  public scoreControl: FormControl = new FormControl('');
  public genreControl: FormControl = new FormControl('');
  public statusControl: FormControl = new FormControl('');
  public startedDateControl: FormControl<Date> = new FormControl<Date>(null);
  //Utilizados para el poblado de los combo-box
  public genres: SelectNombre[];
  public comboBoxValues: NotionBookOptionsResults;

  //Nombres Combo-box
  public comboPuntaje: string;
  public comboEstado: string;
  public comboGenres: string;

  // Valores de los Combo-Box
  public scoreValue: string | null;
  public statusValue: string;
  public genreValue: string;

  constructor(
    private notionBookService: NotionBooksService,
    private bookService: BooksService,
    private _snackBar: MatSnackBar
  ) {
    this.scoreControl.valueChanges.subscribe((value) => {
      this.scoreValue = value;
    });

    this.statusControl.valueChanges.subscribe((value) => {
      this.statusValue = value;
    });

    this.genreControl.valueChanges.subscribe((value) => {
      this.genreValue = value;
    });
  }

  ngOnInit(): void {
    this.isbn13 = this.bookService.getISBN_13(this.data);
    this.notionBookService.getBookByISBN13(this.isbn13).subscribe((res) => {
      if (!res.message) {
        this.existeLibro = true;
        this.notionBookData = res;
        console.log(this.notionBookData);

        const startedDateString = formatDate(res['Start and End'], 'dd/M/yyyy', 'en-US')
        this.selectedStartDate.set(startedDateString)
        this.startedDateControl.setValue(convertStringToDate(this.selectedStartDate()))
      }
      this.getComboBoxValues();
      this.getGenres();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getComboBoxValues() {
    this.notionBookService
      .getSelectOptions()
      .subscribe((res: NotionBookOptionsResults) => {
        this.comboBoxValues = res;
        if (this.notionBookData) {
          const { Estado } = this.notionBookData;
          this.comboEstado = Estado.id;
          console.log(this.comboBoxValues.Estado);
          
          console.log(this.notionBookService.getProperty(this.comboBoxValues.Estado, 'leido'));
        }
      });
  }

  getGenres() {
    this.notionBookService.getGenres().subscribe((res) => {

      this.genres = res;
      console.log(this.genres);

      if (this.notionBookData) {
        const { Genre } = this.notionBookData;
        this.comboGenres = Genre[0];
      }
    });
  }

  changeStartDate(event: MatDatepickerInputEvent<Date>) {
    const formatedStartDate = formatDate(event.value, 'yyyy-MM-dd', 'en-US');
    this.selectedStartDate.set(formatedStartDate);
  }

  onClick() {
    const { title, authors, imageLinks, pageCount } = this.data;
    const newBook: NewBook = {
      icon: imageLinks.thumbnail,
      cover: imageLinks.thumbnail,
      parent: '',
      name: title,
      author: authors,
      pages: pageCount,
      status: this.statusValue,
      isbn_13: this.isbn13,
      year: ['f1d456cd-efcb-4ce1-a9cc-2ec1b5b3dc19'],
      start_end: this.selectedStartDate(),
      score: this.scoreValue,
      genre: [this.genreValue],
    };
    // const estadoSelect = this.selectPuntaje.value
    console.log(newBook);
    this.notionBookService.createBook(newBook).subscribe((res) => {
      this.existeLibro = true;
      this.openSnackBar(res.message, 'Ocultar');
    });
  }
}
