const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false)
    xhttp.send();
    const book = JSON.parse(xhttp.responseText);
    const {
        title,
        author,
        publisher,
        publish_date,
        numOfPages
    } = book;
    alert(publish_date)
    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publish_date').value = publish_date;
    document.getElementById('numOfPages').value = numOfPages;

    document.getElementById('editForm').action = `http://127.0.0.1:3000/book/${isbn}`;

}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false)
    xhttp.send();
    location.reload();
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/books", false)
    xhttp.send();
    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = `
        <div class="col-4">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 test-muted">${book.isbn}</h6>
                <div>Author: ${book.author}</div>
                <div>Publisher: ${book.publisher}</div>
                <div>Numb of pages: ${book.numOfPages}</div>
                <hr>
                <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">DELETE</button>
                <button type="button" class="btn btn-primary" data-toggle="modal"           data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                    EDIT
                </button>
                </div>
            </div>
        </div>
        `
        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}
loadBooks();