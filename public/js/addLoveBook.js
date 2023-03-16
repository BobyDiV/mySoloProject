console.log('--------- add love book --------');

const ul = document.getElementById('ul');

ul.addEventListener('click', async (e) => {
  if (e.target.name === 'addBook') {
    e.preventDefault();

    const bookAdd = {
      isbn: e.target.parentNode.children[0].id,
      title: e.target.parentNode.children[1].id,
      author: e.target.parentNode.children[2].id
        ? e.target.parentNode.children[2].id
        : 'АВТОР НЕ УКАЗАН',
      linkInfo: e.target.parentNode.children[3].id,
      readerId: Number(e.target.id),
    };

    const data = JSON.stringify(bookAdd);

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
