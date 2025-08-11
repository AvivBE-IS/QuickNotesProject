import { useState } from "react";
import "./App.css";

import TextArea from "./components/TextArea.jsx";
import Button from "./components/Button.jsx";
import Note from "./components/Note.jsx";

function App() {
  const [textState, setText] = useState(""); // current text in textarea
  const [titleState, setTitle] = useState(""); //store all titles
  const [notes, setNotes] = useState([]); // store all notes

  const addNote = () => {
    if (textState.trim() !== "") {
      setNotes([...notes, { title: titleState, text: textState }]);
      setTitle(""); // clear title area
      setText(""); // clear text area
      console.log("Note has been added:", titleState, textState);
    }
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
          {notes.map((note, index) => (
            <Note key={index} titleState={note.title} textState={note.text} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
