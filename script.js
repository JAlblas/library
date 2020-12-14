class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBookToLibrary(book) {
        this.books.push(book);
    
        this.populateStorage();
    }

    removeBookFromLibraryWithIndex(index) {
        this.books.splice(index, 1);
        
        this.populateStorage();
    }

    displayBooks() {

        let bookListDiv = document.querySelector('#book-list');
        bookListDiv.innerHTML = "";
        
        console.log(this.books);

        this.books.forEach(book => {

            console.log(book);
            console.log(typeof book)
    
            const content = document.createElement('div');
            content.classList.add('card');
            content.classList.add('bg-info');
            content.classList.add('text-white');
    
            const innerContent = document.createElement('div');
            innerContent.classList.add('card-body');
    
            const header = document.createElement('h5');
            header.classList.add('card-title');
            header.textContent = book.title;
            innerContent.appendChild(header);
    
            const paragraph = document.createElement('p');
            paragraph.classList.add('card-text');
            paragraph.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? "has read" : "not read"}`
            innerContent.appendChild(paragraph);
    
            const button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add('btn-light');
            button.classList.add('delete-button');
    
            button.dataset.indexNumber = this.books.indexOf(book);
            button.addEventListener('click', (e) => {
                let index = e.target.dataset.indexNumber;
                console.log(index);
                removeBookFromLibraryWithIndex(index);
                displayBooks();    
            });        
    
            button.innerText = "Delete Book";
            innerContent.appendChild(button);
    
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('btn');
            toggleButton.classList.add('btn-light');
            toggleButton.classList.add('toggle-button');
    
            toggleButton.dataset.indexNumber = this.books.indexOf(book);
            toggleButton.addEventListener('click', (e) => {
                let index = e.target.dataset.indexNumber;
                let selectedBook = this.books[index];
                selectedBook.read = !selectedBook.read;
            });        
    
            toggleButton.innerText = "Toggle read";
            innerContent.appendChild(toggleButton);
    
            content.appendChild(innerContent);
            bookListDiv.appendChild(content);
        });
    }

    populateStorage() {
        localStorage.setItem('library', JSON.stringify(this.books));
    }
}

let library = new Library([]);

 if(!localStorage.getItem('library')) {
    let book1 = new Book("Game of Thrones", "G.R.R.Martin", 942, true);
    library.addBookToLibrary(book1);
    
    let book2 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 741, false);
    library.addBookToLibrary(book2);
    
    let book3 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 476, false);
    library.addBookToLibrary(book3);
    
    let book4 = new Book("The adventures of Pinocchio", "Carlo Collodi", 355, true);
    library.addBookToLibrary(book4);
    
} else {
    library.books = JSON.parse(localStorage.getItem("library"))
}

library.displayBooks();

$(document).ready(function(){

    $('#createBookForm').on('click','#saveBook', function (e) {
       let newBook = new Book($('#title').val(), $('#author').val(), $('#pages').val(), $('#hasRead').val());
       library.addBookToLibrary(newBook);
       library.displayBooks();

       $('#createBookForm').hide();
    });
})