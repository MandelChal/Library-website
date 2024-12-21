class Library {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('books')) || [

            { title: 'חסד אחד ', author: 'דיוויד באלדאצ', year: 2013, img: 'https://images-evrit.yit.co.il/Images/Products/NewBO/Products/32307/Image_OneGoodDeed_Master.webp' },
            { title: 'השקר הראשון מנצח', author: 'אשלי אלסטון', year: 2010, img: 'https://images-evrit.yit.co.il/Images/Products/NewBO/Products/32294/Image_hashekerharishon_Master.webp' },
            { title: 'יונים מהשאול', author: 'רוברט ארווין הווארד', year: 2003, img: 'https://images-evrit.yit.co.il/Images/Products/NewBO/Products/32601/Image_PigeonsFromHell_Master.webp' },
            { title: 'תקשיבו לי', author: 'טס גריטסן', year: 2014, img: 'https://images-evrit.yit.co.il/Images/Products/NewBO/Products/32194/Image_takshivo_li_Master.webp' },
            { title: 'מכת מחץ', author: 'ישראל פלר', year: 2005, img: 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/03/2171.jpg' },
            { title: 'מוסקיירו', author: 'ארי סלע', year: 2011, img: 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2024/03/2313-1.jpg' },
            { title: ' דופליקטים', author: 'ג\'פרי ארצ\'ר', year: 2012, img: 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/09/2239-1.jpg' },
            { title: 'סערה', author: 'רגנאר יונאסון', year: 2009, img: 'https://images-evrit.yit.co.il/Images/Products/NewBO/Products/31930/Image_saara_Master.webp' },
            { title: 'הנאשמות', author: 'סטיב קוואנו', year: 2016, img: 'https://images-evrit.yit.co.il/Images/Products/NewBO/Products/31348/Image_haneshamot_Master.webp' },
            { title: 'לעולם לא ימצאו אותך', author: 'טובה אלסטרדאל', year: 2018, img: 'https://images-evrit.yit.co.il/Images/Products/NewBO/Products/31811/Image_leolam_lo_Master.webp' }

        ];
        this.renderBooks();
    }

    addBook(title, author, year, img = 'path/to/default/image.jpg') {
        this.books.push({ title, author, year, img });
        localStorage.setItem('books', JSON.stringify(this.books));
        this.renderBooks();
    }

    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
        localStorage.setItem('books', JSON.stringify(this.books));
        this.renderBooks();
    }

    findBooksByAuthor(author) {
        return this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    findBookByTitle(title) {
        return this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
    }

    listAllBooks() {
        return this.books;
    }

    updateBook(oldTitle, newTitle, newAuthor, newYear, newImg) {
        const book = this.findBookByTitle(oldTitle);
        if (book) {
            book.title = newTitle;
            book.author = newAuthor;
            book.year = newYear;
            book.img = newImg || book.img;
            localStorage.setItem('books', JSON.stringify(this.books));
            this.renderBooks();
        }
    }

    renderBooks() {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';
        this.books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <img src="${book.img}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Year: ${book.year}</p>
                <button onclick="showBookDetails('${book.title}')">Details</button>
                <button onclick="library.removeBook('${book.title}')">Remove</button>
                <button onclick="showUpdateBookForm('${book.title}')">Update</button>
            `;
            bookList.appendChild(bookCard);
        });
    }
}

const library = new Library();

function searchBooks() {
    const query = document.getElementById('search').value;
    const books = library.books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    renderSearchResults(books);
}


function renderSearchResults(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <button onclick="showBookDetails('${book.title}')">Details</button>
            <button onclick="library.removeBook('${book.title}')">Remove</button>
            <button onclick="showUpdateBookForm('${book.title}')">Update</button>
        `;
        bookList.appendChild(bookCard);
    });
}

function showBookDetails(title) {
    const book = library.findBookByTitle(title);
    if (book) {
        document.getElementById('book-title').innerText = book.title;
        document.getElementById('book-author').innerText = 'Aouthor ' + book.author;
        document.getElementById('book-year').innerText = book.year;
        document.getElementById('book-image').src = book.img;
        document.getElementById('book-details').style.display = 'block';
    }
}

function closeBookDetails() {
    document.getElementById('book-details').style.display = 'none';
}

function showAddBookForm() {
    document.getElementById('add-book-form').style.display = 'block';
}

function closeAddBookForm() {
    document.getElementById('add-book-form').style.display = 'none';
}


function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('img').value = '';
}
document.getElementById('book-form').onsubmit = function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const img = document.getElementById('img').value || 'https://yefe.co.il/wp-content/uploads/2022/06/Rectangle-1593.png';
    library.addBook(title, author, parseInt(year), img);
    clearForm();
    closeAddBookForm();
};


function showUpdateBookForm(title) {
    const book = library.findBookByTitle(title);
    if (book) {
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('year').value = book.year;
        document.getElementById('img').value = book.img;
        document.getElementById('add-book-form').style.display = 'block';
        document.getElementById('book-form').onsubmit = function (event) {
            event.preventDefault();
            library.updateBook(
                title,
                document.getElementById('title').value,
                document.getElementById('author').value,
                parseInt(document.getElementById('year').value),
                document.getElementById('img').value
            );
            clearForm();
            closeAddBookForm();

        };
    }
}

