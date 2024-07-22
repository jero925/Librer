import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotionBookItem, NotionBooks } from '../interfaces/notion_books/notion-books';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';
import { NotionBookOptionsResults, SelectNombre, SelectOption } from '../interfaces/notion_books/select-options';
import { NewBook, UpdateBook } from '../interfaces/notion_books/create-update-book';

@Injectable({
  providedIn: 'root'
})
export class NotionBooksService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<NotionBooks> {
    return this.http.get<NotionBooks>(`${environment.notionURLBase}/books`)
  }

  getBookByISBN13(ISBN_13: string): Observable<NotionBookItem> {
    return this.http.get<NotionBookItem>(`${environment.notionURLBase}/books/${ISBN_13}`)
  }

  getSelectOptions(): Observable<NotionBookOptionsResults> {
    return this.http.get<NotionBookOptionsResults>(`${environment.notionURLBase}/books/retrieve`)
  }

  getGenres(): Observable<SelectNombre[]> {
    return this.http.get<SelectNombre[]>(`${environment.notionURLBase}/books/genres`)
  }
  checkBookExists(ISBN_13: string): Observable<boolean> {
    return this.http.get<NotionBooks>(`${environment.notionURLBase}/books/${ISBN_13}`)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  createBook(body: NewBook): Observable<NotionBooks> {
    return this.http.post<NotionBooks>(`${environment.notionURLBase}/books`, body)
  }

  updateBook(page_id: string, body: UpdateBook): Observable<NotionBooks> {
    return this.http.patch<NotionBooks>(`${environment.notionURLBase}/books/${page_id}`, body)
  }

  deleteBook(page_id: string): Observable<NotionBooks> {
    return this.http.delete<NotionBooks>(`${environment.notionURLBase}/books/${page_id}`)
  }

  getProperty(options: SelectOption[], filter) {
    return options.filter(option => option.value.toLowerCase() === filter.toLowerCase())
  }
}
