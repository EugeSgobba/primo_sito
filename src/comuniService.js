const express = require('express');
const db = require('./db');
const cors = require('cors');

const corsOptions = {
    origin: 'https://primo-sito.vercel.app', // Sostituisci con l'origine del tuo client React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

const app = express();
app.use(cors(corsOptions));
const  PORT = process.env.PORT || 3001;
app.use(express.json())

// Route to get all comuni
app.get("/api/comuni", (req,res)=>{
    db.query("SELECT nome FROM lista", (err,result)=>{
        if(err) {
            console.log(err)
        } 
        res.json(result)
    });   
});
/*
// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM posts WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

// Route for creating the post
app.post('/api/create', (req,res)=> {

const username = req.body.userName;
const title = req.body.title;
const text = req.body.text;

db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
   if(err) {
   console.log(err)
   } 
   console.log(result)
});   })

// Route to like a post
app.post('/api/like/:id',(req,res)=>{

const id = req.params.id;
db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })
*/
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})