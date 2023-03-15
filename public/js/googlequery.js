console.log('======== Form fo GoogleQuery ========');

const { GoogleQuery } = document.forms;

GoogleQuery.addEventListener('submit', async (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
  data = Object.fromEntries(data.entries());

  console.log('========= Данные для поиска ==========', data);

  if (data.query) {
    window.location.href = `/google/${data.query}`;
  } else {
    alert('Укажите информацию для поиска.');
  }
});
