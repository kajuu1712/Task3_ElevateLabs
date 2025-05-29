const express = require('express')
const app = express()
const port = 3000
const path = require("path")
const { v4: uuidv4 } = require('uuid');     // unique id for each book
const methodOverride = require('method-override');

//ejs views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//public
app.use(express.static(path.join(__dirname, "/public")));

//parsing request body
app.use(express.urlencoded({extended: true}));

//method-override
app.use(methodOverride('_method'));

//sample data
let books = [
  {
    id: uuidv4(),
    title : "To Kill a Mockingbird",
    author: "Harper Lee"
  },
  {
    id: uuidv4(),
    title : "1984",
    author: "George Orwell"
  },
  {
    id: uuidv4(),
    title : "The Alchemist",
    author: "Paulo Coelho"
  },
  {
    id: uuidv4(),
    title : "Atomic Habits",
    author: "James Clear"
  },

];

app.get("/books", (req, res) => {
  res.render("books.ejs", {books});
})

app.get("/books/new", (req, res) => {
  res.render("new.ejs");
})

app.post("/books", (req, res) => {
  let {title, author} = req.body.book;
  books.push({id: uuidv4(), title, author});
  res.redirect("/books");
})

app.get("/books/:id", (req, res) => {
  let {id} = req.params;
  let book = books.find((b) => b.id === id);
  res.render("edit.ejs", {book})
})

app.put("/books/:id", (req, res) => {
  let {id} = req.params;
  let {title, author} = req.body.book;
  let bookById = books.find((b) => b.id === id);
  bookById.title = title;
  bookById.author = author;
  res.redirect("/books");
})

app.delete("/books/:id", (req, res) => {
  let {id} = req.params;
  books = books.filter((b) => b.id !== id);
  res.redirect("/books");
})

app.get('/', (req, res) => {
  res.redirect("/books")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
