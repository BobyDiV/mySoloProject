console.log('---------listBook.js ---- edit & delete book list --------');

const ul = document.getElementById('ul');

ul.addEventListener('click', async (e) => {
  if (e.target.name === 'edit') {
    e.preventDefault();
    // редактирование записи в списке
    const id = String(e.target.id);
    const windowname = String(e.target.dataset.windowname);
    window.location.href = `/books/info/${id}/${windowname}`;
  } else if (e.target.name === 'delete') {
    e.preventDefault();
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
