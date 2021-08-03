import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor(private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage) { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    this.fireStore.doc('/books').set(this.books);
  }

  getBooks() {
    this.fireStore.collection('/books')
      .get().subscribe((data: any) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      })
  }

  getSingleBook(id: number): Promise<Book> {
    return new Promise(
      (resolve, reject) => {
        this.fireStore.doc('/books' + id).get().subscribe(
          (data) => {
            resolve(data as unknown as Book);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        } else {
          return false;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
