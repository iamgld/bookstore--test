import { Component, OnInit } from '@angular/core';

import { DataApiService } from './../../../services/data-api.service';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { Book } from 'src/app/interfaces/book';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.sass']
})
export class ListBooksComponent implements OnInit {

  public books: Book[] = [];
  public isAdmin: any = null;
  public userUid: string = null;

  constructor(
    private dataApi: DataApiService,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getListBooks();
    this.getCurrentUser();
  }

  getListBooks(): void {
    this.dataApi.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

  onDeleteBook(idBook: string): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: Book): void {
    this.dataApi.selectedBook = Object.assign({}, book);
  }

  getCurrentUser(): void {
    this.authService.isAuth().subscribe(async (auth) => {
      if (auth) {
        this.userUid = auth.uid;
        this.isAdmin = this.authService.isUserAdmin(this.userUid);
      }
    });
  }

}
