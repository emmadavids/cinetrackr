fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json();
  })
  .then((data) => {
    const movies = data.Search;
    console.log(movies);
  })
  .catch((error) => {
    console.error("Error occurred while fetching movies:", error);
  });
