import { format } from "date-fns";
import "./Note.css";

function Note(props) {
  const date = new Date("2025-08-31T12:30:00");
  const formatted = format(date, "MMM do hh:mm a");

  const deleteNote = () => {
    props.handleDelete(props.id); // Pass id back on delete
  };

  return (
    <div className="noteContainer">
      <div className="headerRow">
        <div className="noteDate">{formatted}</div>
        <button
          className="closeButton"
          aria-label="Close note"
          onClick={deleteNote}
        >
          ×
        </button>
      </div>
      <div className="noteTitle">{props.titleState}</div>
      <div className="noteText">{props.textState}</div>
    </div>
  );
}

export default Note;
