const fetchMock = require('jest-fetch-mock');
global.fetch = fetchMock;

const {
  searchMoviesByTitle,
  searchMoviesByDateRange,
  getLatestMovies,
  getLatestPopularMovies,
} = require('../controllers/fetchfunctions');


describe('Movie Functions', () => {
    beforeAll(() => {
      fetchMock.enableMocks();
    });
  
    afterAll(() => {
      fetchMock.disableMocks();
    });
  
    test('searchMoviesByTitle should return an array of movies', async () => {
      const mockedResponse = {
        results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
      };
      fetchMock.mockResponseOnce(JSON.stringify(mockedResponse));
  
      const movies = await searchMoviesByTitle('Avengers');
      expect(Array.isArray(movies)).toBe(true);
      expect(movies.length).toBe(mockedResponse.results.length);
    });
  
    // Add more test cases for other movie functions using similar approach
  });
