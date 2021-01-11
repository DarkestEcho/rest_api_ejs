const express = require('express');
const path = require('path');
const list = [];

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/src', express.static(__dirname + '/src'))

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/books', (req, res) =>{
    res.json(list);
});

app.put('/books', (req, res) =>{
    if('id' in req.body && 'author' in req.body && 'title' in req.body
        && 'genre' in req.body && 'year' in req.body)
    {
        list.push(req.body);
        res.status(201);
    }
    else
        res.status(400);
});

app.post('/books', (req, res) =>{
    if('id' in req.body && 'author' in req.body && 'title' in req.body
        && 'genre' in req.body && 'year' in req.body)
    {
        let i = 0;
        for(; i < list.length; i++)
            if(list[i].id == req.body.id)
                break;
                
        if(i < list.length)
        {
            list[i].author = req.body.author;
            list[i].title = req.body.title;
            list[i].genre = req.body.genre;
            list[i].year = req.body.year;
            res.status(202);
        }
        else
            res.status(400);
    }
    else
        res.status(400);
});

app.delete('/books', (req, res) =>{
    for(let i = 0; i < list.length; i++)
        if(req.body.indexOf(list[i].id) != -1)
            list.splice(i--, 1);

    res.status(202);
});

app.get('/last-id', (req, res) =>{
    res.send(list.length == 0 ? "0" : `${+list[list.length - 1].id + 1}`);
});

app.listen(port, hostname);
console.log(`Running server at http://${hostname}:${port}`);