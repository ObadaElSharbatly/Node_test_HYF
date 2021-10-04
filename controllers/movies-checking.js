import { movies } from "../movies-list.js";


export const movieIdFound = movieId => movies.some(movie => movie.id === movieId); 
export const movieTitleFound = movieTitle => movies.some(movie => movie.title === movieTitle); 
export const findMovieById = movieId => movies.find(movie => movie.id === movieId);
export const indexOfMovie = movieId => movies.indexOf(movies.find(movie => movie.id === movieId));
export const searchableId = idParams => movies.some(movie => movie.id.includes(idParams));