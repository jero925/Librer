import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookResults } from '../interfaces/books';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(bookName: string, limit: number = 20, page: number = 1): Observable<BookResults> {
    return this.http.get<BookResults>(`${environment.googleBooksURLBase}/volumes?key=${environment.googleBooksKey}&q=${bookName}&langRestrict=es&maxResults=${limit}&startIndex=${(page) * limit}`)
  }
}
