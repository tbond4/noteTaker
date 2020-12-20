const express = require("express");
const path = require("path");
const fs =require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api/notes",function(req,res){
  // should read the db.json file and return all saved notes as JSON. use fs .THEN JSON.parse() and res.json()
  let db;
  console.log("test");
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    db = JSON.parse(data);
    res.json(db);
  });
  
});

app.post("/api/notes", function(req,res){
  // Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.  fs read file,parse it to
  // arrayobject to work with, push new note,JSON.stringify, fs append
  let newNote=req.body;
  let db;
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    db = JSON.parse(data);
    db.push(newNote);

    fs.writeFile("./db/db.json",JSON.stringify(db),(err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
  
})

app.delete("/api/notes/:id", function(req,res){
  // acess id from req.params.id
  let id=req.params.id;
//fs read, parse, 
let db;
fs.readFile("./db/db.json", (err, data) => {
  if (err) throw err;
  db = JSON.parse(data);
});
//findindex
//remove with splice

// or filter
//myarray = myarray.filter(element =>{element.id !== req.params.id})
db=db.filter(e =>{e.id !== id});
//fs write
fs.appendFile("./db/db.json",JSON.stringify(db));
 res.end("Success!");
// return sucess messeg
});

app.get("/notes", function(req, res) {

    res.sendFile(path.join(__dirname,"./public/notes.html"));
  });

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note,
//  you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.get("*", function(req, res) {

  res.sendFile(path.join(__dirname, "./public/index.html"));
});

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });