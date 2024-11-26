var books = [];

function displayBooks() {
    var mybooks = localStorage.getItem("mybooks");
    if (mybooks) {
        books = JSON.parse(mybooks);
    }

    var tableContent = "";
    for (var i = 0; i < books.length; i++) {
        tableContent += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${books[i].bookName}</td>
          <td><button class="btn-visit btn px-5" onclick="visitBook('${books[i].siteUrl}')">Visit</button></td>
          <td><button onclick="deleteBook(${i})" class="btn px-5">Delete</button></td>
        </tr>`;
    }
    document.getElementById("table-rows").innerHTML = tableContent;
}

function createBook() {
    var bookName = document.getElementById("bookname").value.trim();
    var siteUrl = document.getElementById("siteurl").value.trim();

    var bookNameRegex = /^[a-zA-Z0-9\s,.'-]{3,100}$/;

    var urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (!bookName.match(bookNameRegex)) {
        alert("Please enter a valid book name.");
        return;
    }

    if (!siteUrl.match(urlRegex)) {
        alert("Please enter a valid URL like https://example.com.");
        return;
    }

    var book = {
        bookName: bookName,
        siteUrl: siteUrl,
    };

    books.push(book);
    localStorage.setItem("mybooks", JSON.stringify(books));

    displayBooks();
}

function deleteBook(index) {
    books.splice(index, 1);

    localStorage.setItem("mybooks", JSON.stringify(books));
    displayBooks();
}

function visitBook(siteUrl) {
    window.open(siteUrl, "_blank");
}

displayBooks();
