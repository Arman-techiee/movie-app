import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
export const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p'

export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null

export const getBackdropUrl = (path, size = 'w1280') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
})

export const tmdbApi = {
  // Discovery
  getTrending: (timeWindow = 'week') =>
    tmdb.get(`/trending/movie/${timeWindow}`),

  getNowPlaying: (page = 1) =>
    tmdb.get('/movie/now_playing', { params: { page } }),

  getPopular: (page = 1) =>
    tmdb.get('/movie/popular', { params: { page } }),

  getTopRated: (page = 1) =>
    tmdb.get('/movie/top_rated', { params: { page } }),

  getUpcoming: (page = 1) =>
    tmdb.get('/movie/upcoming', { params: { page } }),

  // Movie Details
  getMovieDetails: (id) =>
    tmdb.get(`/movie/${id}`, {
      params: { append_to_response: 'credits,videos,similar,reviews' },
    }),

  // Search
  searchMovies: (query, page = 1, filters = {}) =>
    tmdb.get('/search/movie', { params: { query, page, ...filters } }),

  // Discover with filters
  discoverMovies: (params = {}) =>
    tmdb.get('/discover/movie', { params }),

  // Genres
  getGenres: () => tmdb.get('/genre/movie/list'),

  // Config
  getConfig: () => tmdb.get('/configuration'),
}

export default tmdb
