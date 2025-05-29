import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes.js";

function App() {
  const [notesList, setNotesList] = useState(notes);

  function deleteNote(id) {
    setNotesList(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem.key !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      {notesList.map((noteItem) => (
        <Note
          key={noteItem.key}
          id={noteItem.key}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
