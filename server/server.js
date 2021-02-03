const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Model = require('./models/ArtBooks');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended:true}) );
server.use(express.json());


mongoose.connect("mongodb+srv://farid118:farid118@art-book-mern.jkeup.mongodb.net/Mern?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

server.post('/app/add', async (req,res) => {
    let {form , name, artist, year, image} = req.body;
    const newArt = new Model({form , name, artist, year, image});

    try{
        await newArt.save();
        await Model.find({form, name, artist, year, image}, (err, result) => {
            let id = result[0]._id;
            res.send({id});
        })
    }
    catch(err){
        console.log(err);
    }
});

server.get('/app/get', async (req, res) => {
    Model.find({}, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

server.get('/app/art/:id', async (req,res) => {
    let id = req.params.id;
    try {
        await Model.findById(id , (err, result) => {
            res.send(result);
        })
    }
    catch(error){
        console.log(error)
    }
});

server.put('/app/update/:id', async (req, res) => {
    let {id,form,name,artist,year,image} = req.body;
    
    try{
        await Model.findById(id, (error,result) => {
            result.form = form;
            result.name = name;
            result.artist = artist;
            result.year = year;
            result.image = image;
            result.save();

            res.send(result);
            
        })
    }
    catch(err){
        console.log(err);
    }
})

server.delete('/app/delete/:id', async (req, res) => {
    let {id} = req.params;
    try{
        await Model.findByIdAndRemove(id).exec();
    }
    catch(err){
        console.log(err);
    }
})

server.post('/app/filter', async(req,res) => {
    let {form,name,artist} = req.body;
    let searchObj = {};
    if (form !== undefined && form !== "all") {
        searchObj = {...searchObj, form}
    }
    if (name !== undefined && name !== '') {
        searchObj = {...searchObj, name}
    }
    if (artist !== undefined && artist !== '') {
        searchObj = {...searchObj, artist}
    }

    await Model.find(searchObj, (err, result) => {
        if (err){
            console.log(err)
        }else{
          res.send(result); 
        }
    })
})

const PORT = process.env.PORT || 2357;
server.listen( PORT, () => console.log(`
    ------------------------
    http://localhost:${PORT}
    ------------------------
`))