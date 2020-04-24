import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataApiService } from './../../services/data-api.service';
import { Book } from 'src/app/interfaces/book';



@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.sass']
})
export class DetailsBookComponent implements OnInit {

  public book: Book = {};

  constructor(
    private dataApi: DataApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idBook = this.route.snapshot.params[`id`];
    this.getDetails(idBook);
  }

  getDetails(idBook: string): void {
    this.dataApi.getOneBook(idBook).subscribe((book) => {
      // console.log('details book', book);
      this.book = book;
    });
  }

}
