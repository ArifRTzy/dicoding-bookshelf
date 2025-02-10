document.addEventListener("DOMContentLoaded", () => {
  const alreadyRead = "Sudah dibaca";
  const haventRead = "Belum dibaca";

  const bookFormSubmit = document.getElementById("bookFormSubmit");
  const bookFormTitle = document.getElementById("bookFormTitle");
  const bookFormAuthor = document.getElementById("bookFormAuthor");
  const bookFormYear = document.getElementById("bookFormYear");
  const bookFormIsComplete = document.getElementById("bookFormIsComplete");

  const searchBookTitle = document.getElementById("searchBookTitle");
  const searchSubmit = document.getElementById("searchSubmit");

  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  bookFormSubmit.addEventListener("click", () => {
    const read = JSON.parse(localStorage.getItem(alreadyRead)) || [];
    const notRead = JSON.parse(localStorage.getItem(haventRead)) || [];

    const id = new Date().getTime();
    const judul = bookFormAuthor.value;
    const author = bookFormAuthor.value;
    const tahun = bookFormAuthor.value;
    const isComplete = bookFormIsComplete.checked;

    const book = {
      id: id,
      title: judul,
      author: author,
      year: tahun,
      isComplete: isComplete,
    };

    if (isComplete) {
      const bookData = [...read, book];
      console.log(bookData);
      localStorage.setItem(alreadyRead, JSON.stringify(bookData));
    } else {
      const bookData = [...notRead, book];
      localStorage.setItem(haventRead, JSON.stringify(bookData));
    }
  });

  searchSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (searchBookTitle.value === "") return alert("cannot empty");
    const read = JSON.parse(localStorage.getItem(alreadyRead)) || [];
    const notRead = JSON.parse(localStorage.getItem(haventRead)) || [];

    completeBookList.innerHTML = "";
    incompleteBookList.innerHTML = "";

    const input = searchBookTitle.value.toLowerCase();

    const result = read.filter((book) =>
      book.title.toLowerCase().includes(input)
    );
    const resultNot = notRead.filter((book) =>
      book.title.toLowerCase().includes(input)
    );

    result.forEach((e) => {
      completeBookList.innerHTML += `
        <div data-bookid={${e.id}} data-testid="bookItem">
            <h3 data-testid="bookItemTitle">${e.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${e.author}</p>
            <p data-testid="bookItemYear">Tahun: ${e.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton">
                Selesai dibaca
              </button>
              <button data-testid="bookItemDeleteButton">Hapus Buku</button>
              <button data-testid="bookItemEditButton">Edit Buku</button>
            </div>
          </div>
        `;
    });
    resultNot.forEach((e) => {
      incompleteBookList.innerHTML += `
        <div data-bookid={${e.id}} data-testid="bookItem">
            <h3 data-testid="bookItemTitle">${e.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${e.author}</p>
            <p data-testid="bookItemYear">Tahun: ${e.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton">
                Selesai dibaca
              </button>
              <button data-testid="bookItemDeleteButton">Hapus Buku</button>
              <button data-testid="bookItemEditButton">Edit Buku</button>
            </div>
          </div>
        `;
    });
  });

  const shelfNotRead = () => {
    const read = JSON.parse(localStorage.getItem(alreadyRead)) || [];
    const notRead = JSON.parse(localStorage.getItem(haventRead)) || [];

    read.map((e) => {
      completeBookList.innerHTML += `
        <div data-bookid=${e.id} data-testid="bookItem">
            <h3 data-testid="bookItemTitle">${e.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${e.author}</p>
            <p data-testid="bookItemYear">Tahun: ${e.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton">
                Belum selesai dibaca
              </button>
              <button data-testid="bookItemDeleteButton">Hapus Buku</button>
            </div>
          </div>
        `;
    });

    notRead.map((e) => {
      incompleteBookList.innerHTML += `
                <div data-bookid=${e.id} data-testid="bookItem">
            <h3 data-testid="bookItemTitle">${e.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${e.author}</p>
            <p data-testid="bookItemYear">Tahun: ${e.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton">
                Selesai dibaca
              </button>
              <button data-testid="bookItemDeleteButton">Hapus Buku</button>
            </div>
          </div>
        `;
    });
  };
  shelfNotRead();

  document.addEventListener("click", (event) => {
    if (event.target.matches('[data-testid="bookItemDeleteButton"]')) {
      const read = JSON.parse(localStorage.getItem(alreadyRead)) || [];
      const notRead = JSON.parse(localStorage.getItem(haventRead)) || [];

      const bookItem = event.target.closest('[data-testid="bookItem"]');
      const bookId = bookItem.getAttribute("data-bookid");

      const result = read.filter((book) => String(book.id) !== String(bookId));
      const resultNot = notRead.filter(
        (book) => String(book.id) !== String(bookId)
      );

      localStorage.setItem(alreadyRead, JSON.stringify(result));
      localStorage.setItem(haventRead, JSON.stringify(resultNot));
    }
    if (event.target.matches('[data-testid="bookItemIsCompleteButton"]')) {
      const read = JSON.parse(localStorage.getItem(alreadyRead)) || [];
      const notRead = JSON.parse(localStorage.getItem(haventRead)) || [];

      const bookItem = event.target.closest('[data-testid="bookItem"]');
      const bookId = bookItem.getAttribute("data-bookid");

      const result = read.find((book) => String(book.id) === String(bookId));
      const resultNot = notRead.find(
        (book) => String(book.id) === String(bookId)
      );

      const results = read.filter((book) => String(book.id) !== String(bookId));
      const resultNots = notRead.filter(
        (book) => String(book.id) !== String(bookId)
      );

      localStorage.setItem(alreadyRead, JSON.stringify(results));
      localStorage.setItem(haventRead, JSON.stringify(resultNots));

      if (result) {
        const readArray = [...notRead, result];
        localStorage.setItem(haventRead, JSON.stringify(readArray));
      }
      if (resultNot) {
        const readArray = [...read, resultNot];
        localStorage.setItem(alreadyRead, JSON.stringify(readArray));
      }
    }
  });
});
