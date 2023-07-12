const sinon = require('sinon');
const { expect, assert } = require('chai');
const { getMovieById, getLatestMovies, getLatestPopularMovies, searchMovies, getMovieCast, getMovieTrailerUrl } = require('../../controllers/fetchfunctions.js');
const API_KEY_T = require('../../tmdb_api_key')
const nock = require('nock');

describe('getMovieById', () => {
    it('should return the movie details', async () => {
        const movieId = 123;
        const mockedResponse = {
            id: movieId,
            title: 'Mocked Movie',
            userScore: NaN
        };

        nock('https://api.themoviedb.org')
            .get(`/3/movie/${movieId}`)
            .query(true)
            .reply(200, mockedResponse);

        const movie = await getMovieById(movieId);

        expect(movie).to.deep.equal(mockedResponse);

        nock.cleanAll();
    });
});

describe('getLatestMovies', () => {
    beforeEach(() => {
        const mockedResponse = {
            results: [
                {
                    id: 1,
                    title: 'Movie 1',
                    poster_path: '/path/to/poster1.jpg',
                },
                {
                    id: 2,
                    title: 'Movie 2',
                    poster_path: '/path/to/poster2.jpg',
                },
            ],
        };

        nock('https://api.themoviedb.org')
            .get('/3/discover/movie')
            .query(true)
            .reply(200, mockedResponse);
    });

    it('should return an array of latest movies', async () => {
        const movies = await getLatestMovies();
        assert(Array.isArray(movies));
        assert.isAbove(movies.length, 0);
        assert.isNumber(movies[0].id);
        assert.isString(movies[0].title);
        assert.isString(movies[0].poster_path);
    });
});


describe('getLatestPopularMovies', () => {
    beforeEach(() => {
        const mockedResponse = {
            results: [
                {
                    id: 1,
                    title: 'Movie 1',
                    poster_path: '/path/to/poster1.jpg',
                },
                {
                    id: 2,
                    title: 'Movie 2',
                    poster_path: '/path/to/poster2.jpg',
                },
            ],
        };

        nock('https://api.themoviedb.org')
            .get('/3/discover/movie')
            .query(true)
            .reply(200, mockedResponse);
    });

    it('should return an array of latest popular movies', async () => {
        const movies = await getLatestPopularMovies();
        assert(Array.isArray(movies));
        assert.isAbove(movies.length, 0);
        assert.isNumber(movies[0].id);
        assert.isString(movies[0].title);
        assert.isString(movies[0].poster_path);
    });
});

describe('searchMovies', () => {
    it('should return an array of movies for a valid search query when searching by title', async () => {
        const validQuery = 'Avengers';

        const mockedResponse = {
            results: [
                {
                    id: 1,
                    title: 'Avengers: Endgame',
                    poster_path: '/path/to/poster1.jpg',
                    release_year: 2019,
                },
                {
                    id: 2,
                    title: 'Avengers: Infinity War',
                    poster_path: '/path/to/poster2.jpg',
                    release_year: 2018,

                },
            ],
        };

        nock('https://api.themoviedb.org')
            .get('/3/search/movie')
            .query({ api_key: API_KEY_T, query: validQuery })
            .reply(200, mockedResponse);

        const movies = await searchMovies(validQuery);
        assert.isArray(movies);
        assert.isAtLeast(movies.length, 2);
        assert.exists(movies[0].id);
        assert.isString(movies[0].title);
        assert.isString(movies[0].poster_path);


    });

});
it('should return an array of movies for a valid search query when searching by year', async () => {
    const validYear = '2020';

    const mockedResponse = {
        results: [
            {
                id: 3,
                title: 'Movie A',
                poster_path: '/path/to/poster3.jpg',
                release_year: 2020,
            },
            {
                id: 4,
                title: 'Movie B',
                poster_path: '/path/to/poster4.jpg',
                release_year: 2020,
            },
        ],
    };

    nock('https://api.themoviedb.org')
        .get('/3/discover/movie')
        .query({ api_key: API_KEY_T, primary_release_year: validYear })
        .reply(200, mockedResponse);

    const movies = await searchMovies('', validYear);
    assert.isArray(movies);
    assert.isAtLeast(movies.length, 2);
    assert.exists(movies[0].id);
    assert.isString(movies[0].title);
    assert.isString(movies[0].poster_path);
});

it('should return an array of movies for a valid search query when searching by genre', async () => {
    const mockedGenreListResponse = {
        genres: [
            { id: 28, name: 'Action' },
            { id: 35, name: 'Comedy' },
        ],
    };

    const mockedResponse = {
        results: [
            {
                id: 5,
                title: 'Movie X',
                poster_path: '/path/to/poster5.jpg',
                release_year: 2021,
            },
            {
                id: 6,
                title: 'Movie Y',
                poster_path: '/path/to/poster6.jpg',
                release_year: 2021,
            },
        ],
    };

    nock('https://api.themoviedb.org')
        .get('/3/genre/movie/list')
        .query({ api_key: API_KEY_T })
        .reply(200, mockedGenreListResponse);

    nock('https://api.themoviedb.org')
        .get('/3/discover/movie')
        .query({ api_key: API_KEY_T, with_genres: 28 })
        .reply(200, mockedResponse);

    const movies = await searchMovies('', '', 'Action');
    assert.isArray(movies);
    assert.isAtLeast(movies.length, 2);
    assert.exists(movies[0].id);
    assert.isString(movies[0].title);
    assert.isString(movies[0].poster_path);
});



it('should return an empty array for an invalid search query', async () => {
    const movies = await searchMovies('InvalidSearchQuery'); 
    assert(Array.isArray(movies));
    assert.strictEqual(movies.length, 0);
});

describe('getMovieCast', () => {
    it('should return an array of cast members for a valid movie ID', async () => {
        const movieId = 12345;

        const mockedResponse = {
            cast: [
                {
                    id: 1,
                    name: 'Actor 1',
                    character: 'Character 1',
                },
                {
                    id: 2,
                    name: 'Actor 2',
                    character: 'Character 2',
                },
            ],
        };

        nock('https://api.themoviedb.org')
            .get(`/3/movie/${movieId}/credits`)
            .query({ api_key: API_KEY_T })
            .reply(200, mockedResponse);

        const cast = await getMovieCast(movieId);
        assert(Array.isArray(cast));
        assert.isAtLeast(cast.length, 2);
        assert.exists(cast[0].id);
        assert.isString(cast[0].name);
        assert.isString(cast[0].character);
    });
})


describe('getMovieTrailerUrl', () => {
    it('should return a valid YouTube trailer URL for a movie with a trailer', async () => {
        const movieId = 12345; 
        const mockedResponse = {
            results: [
                {
                    id: 'abcdefg',
                    key: '123456',
                    type: 'Trailer',
                },
            ],
        };

        nock('https://api.themoviedb.org')
            .get(`/3/movie/${movieId}/videos`)
            .query({ api_key: API_KEY_T }) 
            .reply(200, mockedResponse);

        const trailerUrl = await getMovieTrailerUrl(movieId);

        assert.strictEqual(typeof trailerUrl, 'string');
        assert.strictEqual(trailerUrl.startsWith('https://www.youtube.com/embed/'), true);
    });
});