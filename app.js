const express = require("express");
const path = require('path');
const fs = require('fs');
const { urlencoded } = require("body-parser");
const { dirname } = require("path/posix");
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const app = express();
const port  = 3000;

// Define mongoose schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    age: String,
    email: String,
    address: String,
    textarea: String
});

var contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    const params = {'Title': 'This is the Best Dance website in Bangladesh'};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {'Title': 'This is the Best Dance website in Bangladesh'};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This is data has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item is not saved to the database");
    });
});

app.get('/about', (req, res)=>{
    const params = {'Title': 'This is the Best Dance website in Bangladesh'};
    res.status(200).render('about.pug', params);
});

app.get('/services', (req, res)=>{
    const params = {'Title': 'This is the Best Dance website in Bangladesh'};
    res.status(200).render('services.pug', params);
});

app.get('/info', (req, res)=>{
    const params = {'Title': 'This is the Best Dance website in Bangladesh'};
    res.status(200).render('info.pug', params);
});

app.listen(port, ()=>{
    console.log(`The server is connected successfully in port ${port}`);
})
