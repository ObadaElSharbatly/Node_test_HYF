import express from "express";
import { addMovie } from "../controllers/add-movie.js";
import { deleteMovie } from "../controllers/delete-movie.js";
import { readAllMovies } from "../controllers/read-movie.js";

export const router = express.Router();

// get the movie list in the form of JSON or search in movies
router.get( '/', readAllMovies );
router.get( '/:id', readAllMovies );

//add movie to the list
router.post( '/', addMovie )

// remove movie from the list
router.delete( '/', deleteMovie )
router.delete( '/:id', deleteMovie )