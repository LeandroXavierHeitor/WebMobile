function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Dados recebidos com sucesso!');

      callback(xhr.response);
    } else {
      console.log('error', xhr.status);
    }
  };
  xhr.send();
}

const url =
  'https://api.covid19api.com/live/country/brazil?from=2022-01-01T00:00:00Z&to=2022-02-02T00:00:00Z';

const html = (Province, Deaths, Country, Date) => `
  <div class="card">
    <h3 class="title">${Province} - ${Country}</h3>
    <span>Total de mortes: ${Deaths}</span>
    <p>${Date.split('T')[0].split('-').reverse().join('/')}</p>
  </div>
`;

const content = document.getElementById('content');

getJSON(url, (data) => {
  if (data instanceof Error) {
    return alert('Houve um erro ao carregar seus dados!');
  }

  const obj = data.map((item) =>
    html(item.Province, item.Deaths, item.Country, item.Date)
  );

  console.log(obj.join().replace(/,/g, ''));
  content.innerHTML = obj.join().replace(/,/g, '');
});
