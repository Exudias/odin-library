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
    library.splice(idx, 1);
    displayBooks(); // remove just the specific one? don't remake all?
}

function toggleReadBook(idx) 
{
    library[idx].read = !library[idx].read;
}

function displayBooks() 
{
    bookDisplayContainer.innerHTML = "";

    const librarySize = library.length;
    for (let i = 0; i < librarySize; i++)
    {
        const book = library[i];
        const bookCard = createCardFromBookObject(book);
        // Delete listener
        bookCard.querySelector(".card-delete").addEventListener("click", () => {
            console.log("ALO" + i);
            removeBook(i);
        });
        // Read listener
        bookCard.querySelector(".card-read").getElementsByTagName("input")[0].addEventListener("change", () => {
            console.log("Togal" + i);
            toggleReadBook(i);
            console.log(library);
        });
        bookDisplayContainer.appendChild(bookCard);
    }
}

function createCardFromBookObject({author, title, pages, read})
{
    // Create card
    const card = document.createElement("div");
    card.classList.add("book-card");
    /// Add elements to card
    // Delete button
    const cardDelete = document.createElement("div");
    cardDelete.classList.add("card-delete");
    cardDelete.textContent = "X";
    card.appendChild(cardDelete);
    // Title div
    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;
    card.appendChild(cardTitle);
    // Author div
    const cardAuthor = document.createElement("div");
    cardAuthor.classList.add("card-author");
    cardAuthor.textContent = author;
    card.appendChild(cardAuthor);
    // Pages div
    const cardPages = document.createElement("div");
    cardPages.classList.add("card-pages");
    cardPages.textContent = `${pages} pages`;
    card.appendChild(cardPages);
    // Read div
    const cardRead = document.createElement("div");
    cardRead.classList.add("card-read");
    // Read p tag
    const readPTag = document.createElement("p");
    readPTag.textContent = "Read?";
    cardRead.appendChild(readPTag);
    const readCheckbox = document.createElement("input");
    readCheckbox.setAttribute("type", "checkbox");
    if (read)
    {
        readCheckbox.setAttribute("checked", read);
    }
    cardRead.appendChild(readCheckbox);
    card.appendChild(cardRead);
    return card;
}

const newBookButton = document.querySelector("#new-book-button");
const bookDisplayContainer = document.querySelector(".book-display-container");

newBookButton.addEventListener("click", () => addBookToLibrary("John", "Ditto", 3500, false));