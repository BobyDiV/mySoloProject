console.log('--------- add love book --------');

const ul = document.getElementById('ul');

ul.addEventListener('click', async (e) => {
  if (e.target.name === 'addBook') {
    e.preventDefault();
    const bookAdd = {
      isbn: e.target.parentNode.children[0].dataset.isbn,
      title: e.target.parentNode.children[2].dataset.title,
      author: e.target.parentNode.children[4].dataset.authors
        ? e.target.parentNode.children[4].dataset.authors
        : 'АВТОР НЕ УКАЗАН',
      linkInfo: e.target.parentNode.children[6].dataset.link,
      bookCover:
        e.target.parentNode.parentNode.parentNode.children[0].firstChild.dataset
          .pictureurl,
      readerId: Number(e.target.id),
    };

    const data = JSON.stringify(bookAdd);
    console.log(data);

    // добавляем книгу в базу данных
    try {
      await fetch('/books/isBook', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      e.target.classList += ' bookAdded';
    } catch (error) {
      console.log(error);
    }
  } else {
    // удаляем слушателя события если не нажата нужная кнопка
    ul.removeEventListener('click', e);
  }
});
