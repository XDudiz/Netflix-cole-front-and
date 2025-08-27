const movies = [
  {id:1,title:'Stranger Things',img:'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',backdrop:'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',desc:'Uma série de suspense sobrenatural que se passa nos anos 80, envolvendo mistérios e aventuras.'},
  {id:2,title:'Breaking Bad',img:'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',backdrop:'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',desc:'Um professor de química se torna fabricante de metanfetamina, mudando sua vida para sempre.'},
  {id:3,title:'The Witcher',img:'https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg',backdrop:'https://cdn.wallpapersafari.com/52/1/TcRdwx.jpg',desc:'O bruxo Geralt luta contra monstros e enfrenta destinos complexos em um mundo sombrio.'},
  {id:4,title:'Peaky Blinders',img:'https://image.tmdb.org/t/p/w500/bGZn5RVzMMXju4ev7xbl1aLdXqq.jpg',backdrop:'https://cdn.wallpapersafari.com/32/2/Jlhiq1.jpg',desc:'Família de gangsters enfrenta desafios e lutas pelo controle de Birmingham, Inglaterra.'},
  {id:5,title:'Game of Thrones',img:'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',backdrop:'https://image.tmdb.org/t/p/original/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg',desc:'Intrigas pelo trono de Westeros, alianças e traições em um épico de fantasia.'},
  {id:6,title:'La Casa de Papel',img:'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',backdrop:'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2021/09/03/679305447-la-casa-de-papel-money-heist-wallpaper.jpg',desc:'Um grupo de assaltantes realiza um plano ambicioso de roubo à Casa da Moeda da Espanha.'}
];

const rowsEl = document.getElementById('rows');
const searchEl = document.getElementById('search');

function renderRows(filter=''){
  rowsEl.innerHTML='';
  const row = document.createElement('div'); row.className='row';
  const h = document.createElement('h3'); h.textContent='Populares'; row.appendChild(h);
  const cards = document.createElement('div'); cards.className='cards';

  movies.filter(f=>f.title.toLowerCase().includes(filter.toLowerCase()))
        .forEach(it=>{
    const c = document.createElement('div'); c.className='card';
    const img = document.createElement('img'); img.src=it.img; img.alt=it.title;
    const overlay = document.createElement('div'); overlay.className='overlay';
    overlay.innerHTML = `
      <div class="play-icon">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <h4>${it.title}</h4>
      <p>${it.desc}</p>`;
    c.appendChild(img);
    c.appendChild(overlay);
    cards.appendChild(c);
  });

  row.appendChild(cards);
  rowsEl.appendChild(row);
}

searchEl.addEventListener('input',(e)=>renderRows(e.target.value));
renderRows();

// Hero carousel automático e manual
let currentHero = 0;
const heroBg = document.getElementById('hero-bg');
const heroContent = document.getElementById('hero-content');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function updateHero(){
  const movie = movies[currentHero];
  heroBg.src = movie.backdrop;
  heroContent.querySelector('h1').textContent = movie.title;
  heroContent.querySelector('p').textContent = movie.desc;
}

function nextHero() {
  currentHero = (currentHero + 1) % movies.length;
  updateHero();
}

function prevHero() {
  currentHero = (currentHero - 1 + movies.length) % movies.length;
  updateHero();
}

// Intervalo automático
updateHero();
let heroInterval = setInterval(nextHero, 5000);

// Botões do carrossel
nextBtn.addEventListener('click', () => { nextHero(); resetInterval(); });
prevBtn.addEventListener('click', () => { prevHero(); resetInterval(); });

function resetInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextHero, 5000);
}