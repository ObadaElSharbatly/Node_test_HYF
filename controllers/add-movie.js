import { movies } from "../movies-list.js";
import { movieIdFound, movieTitleFound } from "./movies-checking.js";
import { v4 as genId } from 'uuid';

export const addMovie = (req, res) => {
    const newMovie = {
        id: genId(),
        title: req.body.title,
        director: req.body.director,
        release_date: req.body.release_date 
    }

    if (!req.body.title || !req.body.director || !req.body.release_date) {

        res.status(400).json({err: "make sure that body has has the following properties 'title' , 'director', 'release_date'." });
        return;

    } else if (movieTitleFound(newMovie.title)) {
        
        res.status(400).json({err: `you already have this movie title (${newMovie.title}) in your list`});

    }

    else {
        movies.push(newMovie);

        res.status(200).json({
            newMovie,
            success : `The (${newMovie.title}) movie has been added successfully to your list`,
        })
    }
}


    