import { movies } from "../movies-list.js";
import { indexOfMovie, movieIdFound } from "./movies-checking.js";

export const deleteMovie =  (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({err: `you didn't choose the movie to delete -- make sure to put the right movie id`});

    }
    //if the id in the url is not in the list
    else if (!movieIdFound(id)) {
        res.status(400).json({err: `Sorry you don't have a movie with id (${id}) to delete -- make sure to put the right movie id`});
    }
    //if the request is correct
    else {
        movies.splice(indexOfMovie(id), 1)        
        res.json({success: `Your movie with (${id}) id has been deleted successfully`});
    }
}