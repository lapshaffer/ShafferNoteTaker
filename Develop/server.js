const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Insert code here to make note-taking capabilities work
    // GET request for getNotes
    // POST request for saving notes
    // DELETE request for deleting notes

// Function to write new notes to the db.json file
fs.readFile("./db/db.json", "utf8", (err, data) => {
if (err) {
        console.log(err);
      }
 // Create array to hold old notes
      const notesArray = JSON.parse(data);
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
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);