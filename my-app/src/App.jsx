import { useState } from "react";
import "./App.css";

import TextArea from "./components/TextArea.jsx";
import Button from "./components/Button.jsx";
import Note from "./components/Note.jsx";

function App() {
  const [textState, setText] = useState("");
  const [titleState, setTitle] = useState("");
  const [notes, setNotes] = useState([]);

  // Simple id generator (you can use UUID or nanoid in real apps)
  const addNote = () => {
    if (textState.trim() !== "") {
      const newNote = {
        id: Date.now(), // unique id
        title: titleState,
        text: textState,
      };
      setNotes([...notes, newNote]);
      setTitle("");
      setText("");
      console.log("Note has been added:", titleState, textState);
    }
  };

  const handleDelete = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <>
      <div id="container">
        <div id="blueDiv">
          <input
            value={titleState}
            onChange={(e) => setTitle(e.target.value)}
            className="title"
            placeholder="Title"
          />
          <TextArea textState={textState} setText={setText} />
          <Button onClick={addNote} />
        </div>
        <div id="NotesBar">
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id} // Pass id here
              titleState={note.title}
              textState={note.text}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
