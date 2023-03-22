/* Array of Books */
let books = [];

/* Functions */
const bookList = document.getElementById('book-list');
/* Add book */
function addBook() {
  bookList.innerHTML = '';
  books.forEach((book) => {
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
  });
}

/* Delete Book */
function deleteBook(book) {
  if (book.classList.contains('delete')) {
    book.parentElement.remove();
  }
}

/* Delete Book from Local Storage */
function removeBook(title) {
  const books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book, i) => {
    if (book.title === title) {
      books.splice(i, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}

// check local storage
if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
  addBook();
}

/* Add Books */
const bookForm = document.getElementById('add-form');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  /* Get values from the form */
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  /* Create the book */
  books.push({ title, author });

  /* Add book to the list (create the book in the UI) */
  addBook();

  /* Save book in local storage */
  localStorage.setItem('books', JSON.stringify(books));

  /* Clear Inputs */
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});

/* Delete Books */

bookList.addEventListener('click', (e) => {
  /* Remove book from the list */
  deleteBook(e.target);

  /* Remove book from the local storage */
  removeBook(e.target.previousElementSibling.previousElementSibling
    .previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});
