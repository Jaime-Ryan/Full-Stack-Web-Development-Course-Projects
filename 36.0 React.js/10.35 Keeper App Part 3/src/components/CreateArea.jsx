import React, { useState, useActionState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const newNote = {
        title: formData.get("title"),
        content: formData.get("content")
      };
      
      // Validate the note
      if (!newNote.title.trim() || !newNote.content.trim()) {
        return "Both title and content are required.";
      }
      
      // Add the note
      props.onAdd(newNote);
      
      // Reset form
      setNote({
        title: "",
        content: ""
      });
      
      return null; // No error
    },
    null
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  return (
    <div>
      <form action={submitAction}>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
          required
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </button>
        {error && <p style={{color: "red"}}>{error}</p>}
      </form>
    </div>
  );
}

export default CreateArea;
