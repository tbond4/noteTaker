const express = require("express");
const path = require("path");
const fs =require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api/notes",function(req,res){
  let db;

  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    db = JSON.parse(data);
    res.json(db);
  });

});

app.post("/api/notes", function(req,res){
  let newNote=req.body;
  let db;

  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;

    db = JSON.parse(data);
    db.push(newNote);

    for(let i=0;i<db.length;i++){
      db[i].id=i;
    }
    fs.writeFile("./db/db.json",JSON.stringify(db),(err) => {
      if (err) throw err;
      console.log('The Note has been saved!');
    });
    res.json(newNote);
  });
  
})

app.delete("/api/notes/:id", function(req,res){
let ID=req.params.id;
let db;
let bd = [];
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;

    db = JSON.parse(data);

    for(let i=0;i<db.length;i++){
      if(db[i].id !=ID){
        bd.push(db[i])
      }
    }

    fs.writeFile("./db/db.json",JSON.stringify(bd),(err) => {
      if (err) throw err;
      console.log('The Note has been deleted!');
    });
    res.end("Success");
  });

});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"./public/notes.html"));
  });

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });