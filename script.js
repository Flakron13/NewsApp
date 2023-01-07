const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news/';
let offSet = 0;
let language = 'EN';

const options = lang => {
  return {
    method: 'GET',
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '6b9bd2c385msh81c25090bb283f1p13106djsn01d666521961',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      'Accept-Language': lang,
    },
  };
};

function getSearch(lang) {
  const name = document.querySelector('#search').value;
  const inpSearch = lowerCaseName(name);
  fetch(
    `${baseUrl}search?q=${
      inpSearch || `%3CREQUIRED%3E`
    }&cc=${lang}&offset=${offSet}`,
    options(lang)
  )
    .then(response => response.json())
    .then(data => data.value)
    .then(value => {
      console.log(value);
      let news = '';
      value.map(
        values =>
          (news += ` <div class="news-card">
            <img class="news-img" src='${values?.image?.thumbnail?.contentUrl}' alt='${values?.image?.thumbnail}'/>
            <div class="news-content">
              <h2 class="news-content-title">${values?.name}</h2>
              <p class="news-content-text">${values?.description}</p>
              <div class="news-content-details">
                <p class="news-date">${values?.datePublished}</p>
  
              </div>
            </div>
          </div>`)
      );

      document.querySelector('.news-wrapper').innerHTML = news;
    })
    .catch(err => console.log(err));
}

function nextpage() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  offSet += 10;
  getSearch(language);
  document.getElementById('prevbtn').style.display = 'flex';
}

function prevpage() {
  if (offSet > 1) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    offSet -= 10;
    if (offSet === 0) {
      document.getElementById('prevbtn').style.display = 'none';
    }
    getSearch(language);
  }
}

function toEn() {
  language = 'EN';
  offSet = 0;
  getSearch(language);
  document.getElementById('prevbtn').style.display = 'none';
}

function toDe() {
  language = 'DE';
  offSet = 0;
  getSearch(language);
  document.getElementById('prevbtn').style.display = 'none';
}

document.getElementById('prevbtn').addEventListener('click', () => {
  prevpage();
});
document.getElementById('nextbtn').addEventListener('click', () => {
  nextpage();
});
document.getElementById('langBtnEn').addEventListener('click', () => {
  toEn();
});
document.getElementById('langBtnDe').addEventListener('click', () => {
  toDe();
});
document.getElementById('searchbtn').addEventListener('click', () => {
  getSearch();
});

document.querySelector('#search').addEventListener('click', getSearch);
document.querySelector('#search').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getSearch();
  }
});

function lowerCaseName(string) {
  return string.toLowerCase();
}

getSearch(language);
