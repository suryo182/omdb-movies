// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function() {
//   const inputKeyword = document.querySelector('.input-keyword');
//   fetch('http://www.omdbapi.com/?apikey=1521a912&s=' + inputKeyword.value)
//     .then(res => res.json())
//     .then(res => {
//       const movies = res.Search;
//       let cards = '';
//       movies.forEach(m => {
//         cards += showCards(m);
//       })
//       const movieContainer = document.querySelector('.movie-container');
//       movieContainer.innerHTML = cards;

//       // Ketika tombol detail di-klik

//       const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//       modalDetailButton.forEach(btn => {
//         btn.addEventListener('click', function() {
//           const imdbID = this.dataset.imdbid;
//           fetch('http://www.omdbapi.com/?apikey=1521a912&i=' + imdbID)
//             .then(res => res.json())
//             .then(m => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector('.modal-body');
//               modalBody.innerHTML = movieDetail;
//             })
//         })
//       })
//     })
// })

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function() {
  const inputKeyword = document.querySelector('.input-keyword');
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

// event binding
document.addEventListener('click', async function(e) {
  if (e.target.classList.contains('modal-detail-button')) {
    const imdbID = e.target.dataset.imdbid;
    const details = await getDetails(imdbID);
    updateUIDetails(details);
  }
})

function getMovies(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=1521a912&s=' + keyword)
    .then(res => res.json())
    .then(res => res.Search)
}

function getDetails(imdbID) {
  return fetch('http://www.omdbapi.com/?apikey=1521a912&i=' + imdbID)
    .then(res => res.json())
    .then(res => res)
}

function updateUI(movies) {
  let cards = '';
  movies.forEach(m => {
    cards += showCards(m);
  })
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = cards;
}

function updateUIDetails(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
}


function showCards(m) {
  return ` 
      <div class="col-md-4 my-5">
        <div class="card">
          <img src="${m.Poster}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
          </div>
        </div>
      </div>`;
}

function showMovieDetail(m) {
  return `
      <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
            <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
            <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
            <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
            <li class="list-group-item"><strong>Plot: </strong><br>${m.Plot}</li>
          </ul>
        </div>
      </div>
    </div>`;
}