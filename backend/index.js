const express = require('express');
const mysql= require('mysql');
const cors =require('cors');

const app =express();

app.use(cors());


const db=mysql.createConnection({
    host:"localhost", 
    user:"root",
    password:"root123",
    database:"test"
})

app.get('/',(req,res)=>{
    res.json('hello from the server');
})
app.get('/books',(req,res)=>{
    const qu="Select * from books"
    db.query(qu,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post('/books',(req,res)=>{
    const qu="INSERT INTO books(`title`,`descrip`,`price`,`cover`)VALUES(?)"
    const values=[
       req.body.title,
       req.body.descrip,
       req.body.price,
       req.body.cover
  
    ]
    console.log(values);
    db.query(qu,[values],(err,data)=>{
        if(!err) {
             return res.json("books successfully created")
        }else {return res.json(err)}
    })

})
app.delete('/books/:id',(req,res)=>{
    const bookId=req.params.id;
    const qu ="DELETE FROM books WHERE id=?"

    db.query(qu,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully")
    })

})
app.put('/books/:id',(req,res)=>{
    const bookId=req.params.id;
    const qu ="UPDATE books SET `title`=?,`descrip`=?,`price`=?,`cover`=? WHERE id=?"
    const values=[
        req.body.title,
        req.body.descrip,
        req.body.price,
        req.body.cover
    ]

    db.query(qu,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully")
    })

})





app.listen(8000,()=>{
    console.log("Connected to server at port 8000");
})