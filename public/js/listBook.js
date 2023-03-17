console.log('--------- edit & delete book list --------');

const ul = document.getElementById('ul');

ul.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.name === 'edit') {
    // редактирование записи в списке
    console.log('==== edit book info/ id =====', e.target.id);

    // const bookInfo = {
    //   id: e.target.id,
    //   isbn: e.target.parentNode.children[0].id,
    //   title: e.target.parentNode.children[1].id,
    //   author: e.target.parentNode.children[2].id,
    //   linkInfo: e.target.parentNode.children[3].id,
    // };
    // console.log(' book info =====>', bookInfo);

    // const response = await fetch(`/books/info/${e.target.id}`);
    window.location.href = `/books/info/${e.target.id}`;
  } else if (e.target.name === 'delete') {
    // удаление записи из списка
    console.log('==== delete / id =====', e.target.id);
    try {
      const data = await fetch(`/books/${e.target.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await data.json();
      console.log(result);

      if (result) {
        console.log('Запись успешно удалена');
        e.target.parentElement.remove();
        window.location.reload();
      } else {
        throw new Error('Что-то пошло не так. Запись не удалена!');
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    // удаляем слушателя события если не нажата нужная кнопка
    ul.removeEventListener('click', e);
  }
});
