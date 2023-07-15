let library = [];

class Book
{
    author;
    title;
    pages;
    read;

    constructor(author, title, pages, read)
    {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
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
        const bookCard = createCardFromBookObject(book, i);
        // Delete listener
        bookCard.querySelector(".card-delete").addEventListener("click", () => {
            removeBook(i);
        });
        // Read listener
        bookCard.querySelector(".card-read").getElementsByTagName("input")[0].addEventListener("change", () => {
            toggleReadBook(i);
        });
        bookDisplayContainer.appendChild(bookCard);
    }
}

function createCardFromBookObject({author, title, pages, read}, idx)
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
    // Read label tag
    const readLabelTag = document.createElement("label");
    readLabelTag.textContent = "Read?";
    readLabelTag.setAttribute("for", "read" + idx);
    cardRead.appendChild(readLabelTag);
    const readCheckbox = document.createElement("input");
    readCheckbox.setAttribute("id", "read" + idx)
    readCheckbox.setAttribute("type", "checkbox");
    if (read)
    {
        readCheckbox.setAttribute("checked", read);
    }
    cardRead.appendChild(readCheckbox);
    card.appendChild(cardRead);
    return card;
}

function clearForm()
{
    newBookForm.reset();
}

function closeForm()
{
    newBookFormContainer.classList.add("hidden");
    clearForm();
}

const newBookButton = document.querySelector("#new-book-button");
const bookDisplayContainer = document.querySelector(".book-display-container");

const newBookFormContainer = document.querySelector(".new-book-form-container");
const newBookForm = document.querySelector(".new-book-form");

const formSubmitButton = document.querySelector("#form-submit");

formSubmitButton.addEventListener("click", e => {
    e.preventDefault();
    const formValid = newBookForm.reportValidity();
    if (formValid)
    {
        const fd = new FormData(newBookForm);
        addBookToLibrary(fd.get("author"), fd.get("title"), fd.get("pages"), fd.get("read"));
    }
})

document.querySelector("#form-hide-button").addEventListener("click", closeForm);

// Deny further events when form open
newBookFormContainer.addEventListener("click", e => {
    e.stopPropagation();
})

newBookForm.addEventListener("click", e => {
    e.stopPropagation();
})

// Open form on clicking new book button
newBookButton.addEventListener("click", e => {
    e.stopPropagation();
    newBookFormContainer.classList.remove("hidden");
});

// Close form if clicking outside of it
newBookFormContainer.addEventListener("click", closeForm);

// Close form if escape is pressed
window.addEventListener("keyup", e => {
    if (e.key === "Escape") {
        closeForm();
    }
}, true);