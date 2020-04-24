import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from 'src/app/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  private booksCollection: AngularFirestoreCollection<Book>;
  private books: Observable<Book[]>;
  private bookDoc: AngularFirestoreDocument<Book>;
  private book: Observable<Book>;
  public selectedBook: Book = {
    id: null,
  };

  getAllBooks() {
    this.booksCollection = this.afStore.collection<Book>('books');
    // this.books = this.booksCollection.valueChanges();
    return (this.books = this.booksCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Book;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getAllBooksOffers() {
    this.booksCollection = this.afStore.collection('books', (ref) =>
      ref.where('oferta', '==', '1')
    );
    return (this.books = this.booksCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Book;
          // data.id = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getOneBook(idBook: string) {
    this.bookDoc = this.afStore.doc<Book>(`books/${idBook}`);
    return (this.book = this.bookDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Book;
          // data.id = action.payload.id;
          return data;
        }
      })
    ));
  }

  addBook(book: Book): void {
    this.booksCollection.add(book);
  }

  updateBook(book: Book): void {
    const idBook = book.id;
    this.bookDoc = this.afStore.doc<Book>(`books/${idBook}`);
    this.bookDoc.update(book);
  }

  deleteBook(idBook: string): void {
    this.bookDoc = this.afStore.doc<Book>(`books/${idBook}`);
    this.bookDoc.delete();
  }

}
