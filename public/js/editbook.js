console.log('======== Reader Editor Form ========');

const { editBook } = document.forms;
console.log('editBook=====>', editBook);

editBook.addEventListener('submit', async (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
  data = Object.fromEntries(data.entries());
  const bookId = e.target.lastChild.id;
  const windowName = e.target.lastChild.dataset.windowname;

  console.log('id=====>', bookId);

  console.log('========= editBook data ==========', data);

  if (data.isbn && data.title && data.author && data.linkInfo) {
    data = JSON.stringify(data);
    try {
      await fetch(`/books/editor/${bookId}`, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (windowName === '1') {
        window.location.href = '/books/readerList';
      } else if (windowName === '2') {
        window.location.href = '/books/library';
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Для изменения данных о читателе, пожалуйста заполните все поля!');
  }
});
