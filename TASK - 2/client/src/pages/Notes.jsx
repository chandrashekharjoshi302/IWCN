import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/notes");
        setNotes(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNotes();
  }, []);

  console.log(notes);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/notes/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <div className="notes">
        {notes.map((el) => (
          <div key={el.id} className="note">
            <h2>{el.title}</h2>
            <p>{el.content}</p>
        <div className="notesButton">
            <button className="delete" onClick={() => handleDelete(el.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${el.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
            </div>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new Notes
        </Link>
      </button>
    </div>
  );
};

export default Notes;
