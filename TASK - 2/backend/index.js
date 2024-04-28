import express from "express";
import mysql from "mysql2"; 
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "new_password",
  database: "crud",
});
app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/notes", (req, res) => {
  const q = "SELECT * FROM notes";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/notes", (req, res) => {
  const q = "INSERT INTO notes(`title`, `content`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.content,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/notes/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM notes WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/notes/:id", (req, res) => {
  const notesId = req.params.id;
  const q = "UPDATE notes SET `title`= ?, `content`= ? WHERE id = ?";


  const values = [
    req.body.title,
    req.body.content,
 
  ];

  db.query(q, [...values, notesId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
