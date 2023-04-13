console.log('--------- login --------');

const { login } = document.forms;

login.addEventListener('submit', async (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
  data = Object.fromEntries(data.entries());
  console.log('---------data---------', data);

  if (data.login && data.emailAddress && data.password) {
    data = JSON.stringify(data);
    const result = await fetch('/readers/login', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await result.json();

    console.log('------Результат запроса по входу в систему ---------', res);

    if (res.type === 'Пользователь не найден!') {
      console.log('------Пользователь не найден!');
      window.location.href = '/readers/newreader';
    } else {
      window.location.href = '/books/readerList';
    }
  } else {
    alert('Пожалуйста заполните все поля!');
  }
});
