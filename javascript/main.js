/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */

/* Book Class */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

/* Class UI : Handles UI Tasks */

class UItask {
  /* Show Books */
  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach((book) => {
      UItask.addBook(book);
    });
  }

  /* Add Book to list */
  static addBook(book) {
    const bookList = document.getElementById('book-list');
    const bookContent = document.createElement('div');
    bookContent.className = 'book';
    bookContent.innerHTML = `<p class="book-title">${book.title}</p>
                      <span></span>
                      <p>by</p>
                      <span></span>
                      <p class="book-author">${book.author}</p>
                      <button class="delete">Remove</button>`;
    bookList.appendChild(bookContent);
  }

  /* Delete Book From List */
  static deleteBook(book) {
    if (book.classList.contains('delete')) {
      book.parentElement.remove();
    }
  }

  /* Clear Inputs */
  static clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

/* Class Store: Used to work with Local Storage */
class Storage {
  /* Loading books from local storage */
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  /* Add book to local Storage */
  static addBookLocalStorage(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  /* Remove book from local storage */
  static removeBook(title) {
    const books = Storage.getBooks();

    books.forEach((book, i) => {
      if (book.title === title) {
        books.splice(i, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

/* Display books */
document.addEventListener('DOMContentLoaded', UItask.displayBooks);

/* Adding a book to the list */
const bookForm = document.getElementById('add-form');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  /* Get values from the form */
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  /* Create the book */
  const book = new Book(title, author);

  /* Add book to the list (create the book in the UI) */
  UItask.addBook(book);

  /* Save book in local storage */
  Storage.addBookLocalStorage(book);

  /* Clear Inputs */
  UItask.clearInputs();
});

/* Remove Book from the list */
const bookList = document.getElementById('book-list');

bookList.addEventListener('click', (e) => {
  /* Remove book from the list */
  UItask.deleteBook(e.target);

  /* Remove book from the local storage */
  Storage.removeBook(e.target.previousElementSibling.previousElementSibling
    .previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});