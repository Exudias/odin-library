let library = [];

function Book(author, title, pages, read) 
{
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) 
{
    const newBook = new Book(author, title, pages, read);
    library.push(newBook);
    displayBooks(); // add just one dom element? don't remake all?
}

function removeBook(idx) 
{
    library.slice(idx, 1);
    displayBooks(); // remove just the specific one? don't remake all?
}

function toggleReadBook(idx) 
{
    library[idx].read = !library[idx].read;
}

function displayBooks() 
{
    
}