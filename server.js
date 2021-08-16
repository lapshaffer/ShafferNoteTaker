const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Insert code here to make note-taking capabilities work
// GET /notes request for getNotes and return notes.html
app.get('/notes', (req, res) => {

});
// GET * request to return index.html
app.get('/', (req, res) => {

});
// GET /api/notes to return db.json file as valid json
app.get('/api/notes', (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const notesArray = JSON.parse(data);
    res.json(notesArray);
  });
});
// POST /api/notes request to receive a new note on the request body, add to db.json, and return new note to client
// Give each note a unique id when saved w/ uuid
app.post('/api/notes', (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    };
    // Create array to hold old notes
    const notesArray = JSON.parse(data);
    // Make sure new note has all necessary compnents and create
    const { title, text } = req.body;
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuidv4()
      };
      // push the new note to this array
      notesArray.push(newNote);
      // write the new array over the file
      fs.writeFile(`./db/db.json`, JSON.stringify(notesArray), (err) =>
        err
          ? console.error(err)
          : console.log(
            `New note ${newNote.title} has been saved!`
          )
      );
      res.json(newNote);
    }
  });
});
// Optional DELETE request for deleting notes
// app.delete();

// // Function to write new notes to the db.json file
// fs.readFile("./db/db.json", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   // Create array to hold old notes
//   const notesArray = JSON.parse(data);
//   // push the new note to this array
//   notesArray.push(newNote);
//   // write the new array over the file
//   fs.writeFile(`./db/db.json`, JSON.stringify(notesArray), (err) =>
//     err
//       ? console.error(err)
//       : console.log(
//         `New note ${newNote.title} has been saved!`
//       )
//   );
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);