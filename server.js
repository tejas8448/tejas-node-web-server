const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


let app = express();
hbs.registerPartials('views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toDateString();
    let log = `${now}:${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log +'\n', (err) => {
        if(err) {
            console.log('unable to append to server.log');
        }
    });
    
    next();
});

// app.use((req, res, next) => {
//     res.render('maintanace');
// });
app.use(express.static('public'));
app.get('/',(req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMsg: 'Hello dear, How are you doing today? Welcome to our website.',
       currentYear: new Date().getFullYear()
   })
});



app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page',
       currentYear: new Date().getFullYear()
   });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to process your request!'
    });
});
app.listen(3000);