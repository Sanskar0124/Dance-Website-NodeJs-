const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 80;

// Mongoose Specific Stuff
mongoose.connect('mongodb://localhost/danceContact', {useNewUrlParser: true, useUnifiedTopology: true});

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

// Schema for contact form
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
    
  });

// Converting Schema into model
const contact = mongoose.model('contactInfo', contactSchema);

app.get('/',(req, res)=>{
    res.status(200).render('home.pug')
})

app.get('/about',(req, res)=>{
    res.status(200).render('about.pug')
})
app.get('/services',(req, res)=>{
    res.status(200).render('services.pug')
})
app.get('/info',(req, res)=>{
    res.status(200).render('info.pug')
})

app.get('/contact',(req, res)=>{
    res.status(200).render('contact.pug')
})

// post request
app.post('/contact',(req, res)=>{
    var myData = new contact(req.body)
    myData.save().then(()=>{
        res.send("Your form is submitted sucesfully") 
    }).catch(()=>{
        res.status(400).send("your form is not saved")
    })
    
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`server is running successfully on port ${port}`)
})
