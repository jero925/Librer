import { Component, OnInit, computed, effect, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
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
  SelectNombre
} from '../../core/interfaces/notion_books/select-options';
import { AsyncPipe, formatDate } from '@angular/common';
import { NewBook, UpdateBook } from '../../core/interfaces/notion_books/create-update-book';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { convertStringToDateAR, convertStringToDateNotion } from '../../shared/utils/string-to-date';

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
  public isStarted: boolean = false;
  public isEnded: boolean = false;

  readonly dialogRef = inject(MatDialogRef<BookDetailComponent>)
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
    this.statusControl.valueChanges.subscribe((value) => {
      this.statusValue = value;
      this.isEnded = this.checkBookStatus('Leido')
      this.isStarted = this.checkBookStatus('Reading')
    });

    this.genreControl.valueChanges.subscribe((value) => {
      this.genreValue = value;
    });

    this.scoreControl.valueChanges.subscribe((value) => {
      this.scoreValue = value;
    });
  }

  ngOnInit(): void {
    this.isbn13 = this.bookService.getISBN_13(this.data);
    this.notionBookService.getBookByISBN13(this.isbn13).subscribe((res) => {
      if (!res.message) {
        this.existeLibro = true;
        this.notionBookData = res;
        console.log(this.notionBookData);

        const startedDateString = formatDate(res['Start and End'], 'dd/MM/yyyy', 'en-US')
        this.selectedStartDate.set(startedDateString)
        this.startedDateControl.setValue(convertStringToDateAR(this.selectedStartDate()))
      }
      this.getComboBoxValues();
      this.getGenres();
      this.isEnded = this.checkBookStatus('Leido')
    });
  }

  checkBookStatus(status) {
    return true ? this.statusValue === status : false;
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
          this.comboEstado = Estado.value;
        }
      });
  }

  getGenres() {
    this.notionBookService.getGenres().subscribe((res) => {

      this.genres = res;
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
    if (this.existeLibro) {
      this.onClickUpdate()
    } else {
      this.onClickCreate()
    }
  }

  onClickCreate() {
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

  onClickDelete() {
    const { page_id } = this.notionBookData;
    console.log(page_id);
    this.notionBookService.deleteBook(page_id).subscribe((res) => {
      this.openSnackBar(res.message, 'Ocultar');
      this.dialogRef.close(); // Cerrar el diálogo después de eliminar
    });
  }

  onClickUpdate() {
    console.log(this.selectedStartDate());

    const updateBook: UpdateBook = {
      parent: '',
      status: this.statusValue,
      year: ['f1d456cd-efcb-4ce1-a9cc-2ec1b5b3dc19'],
      start_end: this.selectedStartDate(),
      score: this.scoreValue,
      genre: [this.genreValue],
    };
    console.log(updateBook);
    const { page_id } = this.notionBookData
    this.notionBookService.updateBook(page_id, updateBook).subscribe((res) => {
      this.openSnackBar(res.message, 'Ocultar');
    });
  }
}
