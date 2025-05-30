function ToDoItem(props) {
  return (
    <div className="todo-item">
      <li 
        onClick={() => {
          props.onToggle(props.id);
        }}
        style={{
          textDecoration: props.isCompleted ? "line-through" : "none",
          opacity: props.isCompleted ? 0.6 : 1,
          cursor: "pointer"
        }}
        title="Click to toggle completion"
      >
        {props.text}
      </li>
      <button 
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          props.onDelete(props.id);
        }}
        title="Delete this item"
      >
        <span>Delete</span>
      </button>
    </div>
  );
}

export default ToDoItem;
