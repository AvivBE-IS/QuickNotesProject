import React, { useState, useEffect } from "react";
import "./App.css";

import TextArea from "./components/TextArea.jsx";
import Button from "./components/Button.jsx";
import Note from "./components/Note.jsx";

const categories = {
  Personal: "#FFD700", // Gold
  Work: "#87CEEB", // Sky Blue
  Study: "#90EE90", // Light Green
  Other: "#FFB6C1", // Light Pink
};

function App() {
  const [textState, setText] = useState("");
  const [titleState, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [noteCategory, setNoteCategory] = useState("Personal");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
      console.log("Loaded notes from localStorage:", JSON.parse(savedNotes));
    } else {
      console.log("No notes found in localStorage.");
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText) return;
    console.log("Selected category:", noteCategory); // Log the category
    setNotes([...notes, { text: noteText, category: noteCategory }]);
    setNoteText("");
  };

  // Filter notes by search and category
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.text.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || note.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
        <form onSubmit={handleAddNote}>
          <input
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter note"
          />
          <select
            value={noteCategory}
            onChange={(e) => setNoteCategory(e.target.value)}
          >
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button type="submit">Add Note</button>
        </form>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "1em", width: "100%" }}
        />

        {/* Category Filter Buttons */}
        <div style={{ marginBottom: "1em" }}>
          <button
            onClick={() => setCategoryFilter("All")}
            style={{
              marginRight: "0.5em",
              background: categoryFilter === "All" ? "#ccc" : "#fff",
            }}
          >
            All
          </button>
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                marginRight: "0.5em",
                background: categoryFilter === cat ? categories[cat] : "#fff",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul>
          {filteredNotes.map((note, idx) => (
            <li
              key={idx}
              style={{
                background: categories[note.category],
                padding: "8px",
                margin: "4px 0",
                borderRadius: "4px",
              }}
            >
              <strong>{note.category}:</strong> {note.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
