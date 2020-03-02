$.ajax({
  url: 'http://www.omdbapi.com/?apikey=1521a912&s=avengers',
  success: res => {
    const movies = res.Search;
    console.log(movies);
  },
  error: e => {
    console.log(e.responseText);
  }
});