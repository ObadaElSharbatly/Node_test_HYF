
import supertest from "supertest";
import { app } from "../index.js";
import { movies } from "../movies-list.js";
import randomMovieNames from "random-movie-names";

const testId = "id-for-test";
const invalidID = "impossibleId5501450";
const request = supertest(app)
describe("Get request", ()=> {
    it ("get all movies when user didn't give special id", ()=> {
        return request.get('/movie')
        .expect(200)
        .expect('Content-Type', /json/)

        .then(response => {
            expect(response.body).toHaveProperty("number_of_movies");
            expect(response.body).toHaveProperty("movies");
        });
    });


    it ("get the correct movie when search of specific id", ()=> {
        return request.get(`/movie/${testId}`)
        .expect(200)
        .expect('Content-Type', /json/)

        .then(response => {
            expect(Object.keys(response.body).length).toBe(4);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title");
            expect(response.body).toHaveProperty("director");
            expect(response.body).toHaveProperty("release_date");
        });
    });


    it ("get error if the id is not exist at all", ()=> {
        return request.get(`/movie/${invalidID}`)
        .expect(400)
        .expect('Content-Type', /json/)

        .then(response => {
            expect(Object.keys(response.body).length).toBe(1);
            expect(response.body).toHaveProperty("err", `the movie with id (${invalidID}) is not in the list`);
        });
    });

    it ("get some movies suggestion if the id is not found but searchable", ()=> {
        const moreMovies = [
            {
                id: "5601",
                title: randomMovieNames(),
                director: "Selvester",
                release_date: "2019-09-27"
            },
            {
                id: "7605",
                title: randomMovieNames(),
                director: "anybody",
                release_date: "2019-09-27"
            }
        ];

        movies.push(moreMovies[0], moreMovies[1]);

        return request.get('/movie/60')
        .expect(200)
        .expect('Content-Type', /json/)

        .then(response => {

            expect(Object.keys(response.body).length).not.toBeLessThan(1);
            expect(Object.keys(response.body[0]).length).toBe(4);

            expect(response.body[0]).toHaveProperty("id");
            expect(response.body[0]).toHaveProperty("title");
            expect(response.body[0]).toHaveProperty("director");
            expect(response.body[0]).toHaveProperty("release_date");
        });
    });
});

describe("Post request", ()=> {

    describe("testing body properties", () => {

        it ("if the body is empty", () => {

            return request.post('/movie')
            .expect(400)
            .expect('Content-Type', /json/)

            .then(response => {
                expect(response.body).toHaveProperty("err", "make sure that body has has the following properties 'title' , 'director', 'release_date'.");
            });
        });

        it ("get error if user didn't put (title) property", () => {

            return request.post('/movie')
            .send({
                director: "some one",
                release_date: "2020-10-10"
            })
            .expect(400)
            .expect('Content-Type', /json/)

            .then(response => {
                expect(response.body).toHaveProperty("err", "make sure that body has has the following properties 'title' , 'director', 'release_date'.");
            });
        });

        it ("get error if user didn't put (director) property", () => {

            return request.post('/movie')
            .send({
                title: randomMovieNames(),
                release_date: "2020-10-10"
            })
            .expect(400)
            .expect('Content-Type', /json/)

            .then(response => {
                expect(response.body).toHaveProperty("err", "make sure that body has has the following properties 'title' , 'director', 'release_date'.");
            });
        });

        it ("get error if user didn't put (release_date) property", () => {

            return request.post('/movie')
            .send({
                director: "some one",
                title: randomMovieNames()
            })
            .expect(400)
            .expect('Content-Type', /json/)

            .then(response => {
                expect(response.body).toHaveProperty("err", "make sure that body has has the following properties 'title' , 'director', 'release_date'.");
            });
        });

        it ("user can add a movie when the body content is correct", () => {

            return request.post('/movie')
            .send({
                director: "some one",
                title: randomMovieNames(),
                release_date: "2020-10-10"
            })
            .expect(200)
            .expect('Content-Type', /json/)

            .then(response => {

                expect(response.body).toHaveProperty("newMovie");

                expect(Object.keys(response.body["newMovie"]).length).toBe(4);

                expect(response.body["newMovie"]).toHaveProperty("id");
                expect(response.body["newMovie"]).toHaveProperty("title");
                expect(response.body["newMovie"]).toHaveProperty("director");
                expect(response.body["newMovie"]).toHaveProperty("release_date");
            });
        });
    });


    describe("other post tests", () => {
        it("user cannot choose the id even when put in the body", () => {
            const id = "myOwnID-14681651"
            return request.post('/movie')
            .send({
                id: id,
                title: randomMovieNames(),
                director: "christopher Nolan",
                release_date: "2010-09-27"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).not.toHaveProperty("err", "make sure that body has has the following properties 'title' , 'director', 'release_date'.");
                expect(response.body).toHaveProperty("newMovie");
                expect(Object.keys(response.body["newMovie"]).length).toBe(4);
                expect(response.body["newMovie"]).toHaveProperty("id");
                expect(response.body["newMovie"].id).not.toBe(id);
                expect(response.body["newMovie"]).toHaveProperty("title");
                expect(response.body["newMovie"]).toHaveProperty("director");
                expect(response.body["newMovie"]).toHaveProperty("release_date");
            })
        })

        it("user cannot add any extra properties to the movie object", () => {
            return request.post('/movie')
            .send({
                title: randomMovieNames(),
                director: "christopher Nolan",
                release_date: "2010-09-27",
                watched: false,
                rate: "5.5"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {

                expect(response.body).not.toHaveProperty("err", "make sure that body has has the following properties 'title' , 'director', 'release_date'.");
                expect(response.body).toHaveProperty("newMovie");

                expect(Object.keys(response.body["newMovie"]).length).toBe(4);

                expect(response.body["newMovie"]).toHaveProperty("id");
                expect(response.body["newMovie"]).toHaveProperty("title");
                expect(response.body["newMovie"]).toHaveProperty("director");
                expect(response.body["newMovie"]).toHaveProperty("release_date");

                expect(response.body["newMovie"]).not.toHaveProperty("watched");
                expect(response.body["newMovie"]).not.toHaveProperty("rate");
            })
        })

        it("user cannot add exist movie title", () => {
            return request.post('/movie')
            .send({
                title: "The Italian job",
                director: "christopher Nolan",
                release_date: "2010-09-27",
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .then(response => {

                expect(response.body).toHaveProperty("err", "you already have this movie title (The Italian job) in your list");
            })
        })
    })


    
});

describe("Delete request", ()=> {
    it ("get error if user didn't put id in the request url", () => {

        request.delete('/movie')
        .expect(400)
        .expect('Content-Type', /json/)

        .then(response => {
            expect(response.body).toHaveProperty("err", "you didn't choose the movie to delete -- make sure to put the right movie id");
        });
    });

    it ("get error if user put invalid id", () => {

        request.delete(`/movie/${invalidID}`)
        .expect(400)
        .expect('Content-Type', /json/)

        .then(response => {
            expect(response.body).toHaveProperty("err", `Sorry you don't have a movie with id (${invalidID}) to delete -- make sure to put the right movie id`);
        });
    });

    it ("successfully delete the item from the list", () => {

        request.delete(`/movie/${testId}`)
        .expect(200)
        .expect('Content-Type', /json/)

        .then(response => {
            expect(response.body).toHaveProperty("success", `Your movie with (${testId}) id has been deleted successfully`);
        });
    });

    it ("make get request to make sure that the object has been deleted from the list", () => {
        
        request.get(`/movie/${testId}`)
        .expect(400)
        .expect('Content-Type', /json/)

        .then(response => {
            expect(response.body).toHaveProperty("err", `the movie with id (${testId}) is not in the list`);
        })
    })
});