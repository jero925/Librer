import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotionBookItem, NotionBooks } from '../interfaces/notion_books/notion-books';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';
import { NotionBookOptionsResults } from '../interfaces/notion_books/select_options';

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

  getSelectOptions() {
    return this.http.get<NotionBookOptionsResults>(`${environment.notionURLBase}/books/retrieve`)
  }

  checkBookExists(ISBN_13: string): Observable<boolean> {
    return this.http.get<NotionBooks>(`${environment.notionURLBase}/books/${ISBN_13}`)
      .pipe(
        map(() => true),
        catchError(() => of(false)) 
      );
  }
}
