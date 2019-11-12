const express = require('express');
const PORT = 3000;
const app = express();
const path = require('path');
const { syncAndSeed, Person, Place, Thing } = require('./db');

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/api/people', (req, res, next) => {
    Person.findAll()
    .then(persons => {
        res.send(persons)
    })
    .catch(next);
});

app.get('/api/places', (req, res, next) => {
    Place.findAll()
    .then(places=> {
        res.send(places)
    })
    .catch(next)
});


app.get('/api/things', (req, res, next) => {
    Thing.findAll()
    .then(things => {
        res.send(things)
    })
    .catch(next)
});

syncAndSeed()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Listening on http://localhost:${PORT}');
        });
    });

