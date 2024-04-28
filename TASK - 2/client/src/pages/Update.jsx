import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [notes, setNotes] = useState({
    title: "",
    content: "",

  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const notesId = location.pathname.split("/")[2];
  console.log(notesId)

  const handleChange = (e) => {
    setNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/notes/${notesId}`, notes);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Notes</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="content"
        name="content"
        onChange={handleChange}
      />
      
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
