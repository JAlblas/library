let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "has read" : "not read"}`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibraryWithIndex(index) {
    myLibrary.splice(index, 1);
    console.log("delete run!");
}

function displayBooks() {
    console.log(myLibrary);

    let bookListDiv = document.querySelector('#book-list');
    bookListDiv.innerHTML = "";

    myLibrary.forEach(book => {

        console.log(book.info());

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
        paragraph.textContent = book.info();
        innerContent.appendChild(paragraph);

        const button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-light');
        button.classList.add('delete-button');

        button.dataset.indexNumber = myLibrary.indexOf(book);
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

        toggleButton.dataset.indexNumber = myLibrary.indexOf(book);
        toggleButton.addEventListener('click', (e) => {
            let index = e.target.dataset.indexNumber;
            let selectedBook = myLibrary[index];
            selectedBook.read = !selectedBook.read;
            console.log(selectedBook);
        });        

        toggleButton.innerText = "Toggle read";
        innerContent.appendChild(toggleButton);

        content.appendChild(innerContent);
        bookListDiv.appendChild(content);
    });
}

let book1 = new Book("Game of Thrones", "G.R.R.Martin", 942, true);
addBookToLibrary(book1);

let book2 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 741, false);
addBookToLibrary(book2);

let book3 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 476, false);
addBookToLibrary(book3);

let book4 = new Book("The adventures of Pinocchio", "Carlo Collodi", 355, true);
addBookToLibrary(book4);

displayBooks();


$(document).ready(function(){

    $('#exampleModal').on('click','#saveBook', function (e) {
       let newBook = new Book($('#title').val(), $('#author').val(), $('#pages').val(), $('#hasRead').val());
       addBookToLibrary(newBook);
       displayBooks();

       $('#exampleModal').hide();
    });
})