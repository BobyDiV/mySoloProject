console.log('======== Reader Editor Form ========');

const { editReader } = document.forms;

editReader.addEventListener('submit', async (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
  data = Object.fromEntries(data.entries());

  console.log('========= editReader data ==========', data);

  if (data.login && data.emailAddress && data.fullName) {
    data = JSON.stringify(data);
    try {
      const result = await fetch('/readers/profile/editor', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // const res = await result.json();
      // console.log(res);
      window.location.href = '/readers/profile';
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Для изменения данных о читателе, пожалуйста заполните все поля!');
  }
});
