import { Component, OnInit } from '@angular/core';

import { DataApiService } from 'src/app/services/data-api.service';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.sass']
})
export class OffersComponent implements OnInit {

  public books: Book[];

  constructor(
    private dataApi: DataApiService
  ) { }

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(): void {
    this.dataApi.getAllBooksOffers()
      .subscribe(offers => this.books = offers);
  }


}
