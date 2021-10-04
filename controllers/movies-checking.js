import { movies } from "../movies-list.js";

// booleans
export const movieIdFound = movieId => movies.some(movie => movie.id === movieId); 
export const movieTitleFound = movieTitle => movies.some(movie => movie.title === movieTitle); 
export const searchableId = idParams => movies.some(movie => movie.id.includes(idParams));

// find the movie by id
export const findMovieById = movieId => movies.find(movie => movie.id === movieId);

// number of index of the movie in the list
export const indexOfMovie = movieId => movies.indexOf(movies.find(movie => movie.id === movieId));