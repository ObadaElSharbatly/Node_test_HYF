import { v4 as genId } from 'uuid';

export let movies = [
    {
        id: genId(),
        title: "inception",
        director: "christopher Nolan",
        release_date: "2010-09-27"
    },
    {
        id: genId(),
        title: "The Irishman",
        director: "Martin Scorsese",
        release_date: "2019-09-27"
    },
    {
        id: "id-for-test",
        title: "The Italian job",
        director: "Martin Scorsese",
        release_date: "2019-09-27"
    },
];