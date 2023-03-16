console.log('--------- registration --------');

const { NewReader } = document.forms;

NewReader.addEventListener('submit', async (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
  data = Object.fromEntries(data.entries());
  console.log(data);

  if (data.login && data.emailAddress && data.password) {
    data = JSON.stringify(data);
    const result = await fetch('/readers/newreader', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await result.json();
    console.log(res);
    window.location.href = '/readers/login';
  } else {
    alert('Пожалуйста заполните все поля!');
  }
});
