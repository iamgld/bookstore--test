import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { DataApiService } from './../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  @Input() userUid: string;
  @ViewChild('btnClose') btnClose: ElementRef;

  constructor(
    public dataApi: DataApiService
  ) { }

  ngOnInit(): void {
    // console.log(this.userUid);
  }

  onSavedBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      // new book
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    } else {
      // update book
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
