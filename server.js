const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log(req.url, req.method);
    fs.appendFile('server.log', `${req.method} ${req.url} \n`);

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         title: 'Maintenance',
//         message: 'The website is under maintenance'
//     });
// });

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        welcome_message: 'Hello there!'
    });
});

app.get('/about', (req, res) => {
    res.send({
        test: 'about'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs', {
        title: 'Portfolio',
        message: 'Satish Gadhave'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to open that page'
    });
});

app.listen(8002, () => {
    console.log('Server is ready to handle requests...');
});