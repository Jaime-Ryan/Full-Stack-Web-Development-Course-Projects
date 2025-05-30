import React, { useState, useOptimistic } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    notes,
    (currentNotes, optimisticNote) => {
      if (optimisticNote.type === "add") {
        return [...currentNotes, optimisticNote.note];
      } else if (optimisticNote.type === "delete") {
        return currentNotes.filter((_, index) => index !== optimisticNote.id);
      }
      return currentNotes;
    }
  );

  function addNote(newNote) {
    // Optimistically add the note immediately
    addOptimisticNote({ type: "add", note: newNote });
    
    // Then update the actual state
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    // Optimistically remove the note immediately
    addOptimisticNote({ type: "delete", id });
    
    // Then update the actual state
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {optimisticNotes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
