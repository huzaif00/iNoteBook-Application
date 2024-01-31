import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteinitial = [];
  const [notes, setNotes] = useState(noteinitial);
//Get all  Note
const getNotes = async () => {
  //API Call

  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token'),
    },
  });
  const json=await response.json()
  console.log(json) 
  setNotes(json)

};

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note=await response.json();
    setNotes(notes.concat(note));


    
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      
    });
    const json=await response.json()
    console.log(json) 
    console.log("deleting the note" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    console.log(newNote);
    setNotes(newNote);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    let newNotes=JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;

      }
    }
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
