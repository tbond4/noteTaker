const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "../../index.html"));
  });

app.get("/notes", function(req, res) {

    res.sendFile(path.join(__dirname,"../../notes.html"));
  });

app.get("/api/notes",function(req,res){
    // should read the db.json file and return all saved notes as JSON.
    res.json();
  });

app.post("/api/notes", function(req,res){
    // Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    res.json();
})

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note,
//  you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.


  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });