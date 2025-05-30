import React, { useTransition } from "react";

function Note(props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      props.onDelete(props.id);
    });
  }

  return (
    <div className="note" style={{ opacity: isPending ? 0.7 : 1 }}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? "Deleting..." : "DELETE"}
      </button>
    </div>
  );
}

export default Note;
