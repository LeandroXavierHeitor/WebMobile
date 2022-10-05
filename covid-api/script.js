const getJSON = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Dados recebidos com sucesso!');

      callback(xhr.response);
    } else {
      return alert('Houve um erro ao carregar seus dados!');
    }
  };
  xhr.send();
};

const html = (Province, Deaths, Country, Date) => `
  <div class="card">
    <img src="https://www.sicamous.ca/public/uploads/images/web_thumbnail1/1585854946-950w_web_thumbnail1.jpg" alt="Card Corona Virus"/>
    <h3 class="title">${Province} - ${Country}</h3>
    <span>Total de mortes: ${Deaths}</span>
    <p>${Date.split('T')[0].split('-').reverse().join('/')}</p>
  </div>
`;

const content = document.getElementById('content');

const url =
  'https://api.covid19api.com/live/country/brazil?from=2022-01-01T00:00:00Z&to=2022-02-02T00:00:00Z';

getJSON(url, (data) => {
  if (data instanceof Error) {
    return alert('Houve um erro ao carregar seus dados!');
  }

  const obj = data.map((item) =>
    html(item.Province, item.Deaths, item.Country, item.Date)
  );

  content.innerHTML = obj.join().replace(/,/g, '');
});
