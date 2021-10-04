import { movies } from "../movies-list.js";
import { findMovieById, movieIdFound, searchableId } from "./movies-checking.js";

export const readAllMovies = (req, res) => {
    const id = req.params.id
    // returns all movies
    if (!id) {
    
        res.status(200).json({"number_of_movies": movies.length, movies})
        
    } 
    
    // if id is not exists we gonna give suggestions or give error
    else if (!movieIdFound(id)) {

        searchableId(id) ? 
        res.status(200).json(movies.filter(movie => movie.id.includes(id))) :
        res.status(400).json({err: `the movie with id (${id}) is not in the list`});

    } 
    
    // return the only movie with the id
    else {

        res.status(200).json(findMovieById(id));

    }
};