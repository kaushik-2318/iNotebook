// import { json } from "react-router-dom";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5050";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`http://127.0.0.1:5050/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMmJhNzE5MWFlMzQzMTZiZjg3ZjI3In0sImlhdCI6MTY5NTgxODcxMX0.L_9tuL7GavrUiL1KX5hDB075XCoipxQ1Eqlg50yrjm8"
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json);
    }

  //ADD a note
  const addnote = async(title, description, tag) => {
    //TODO API CALL
        //API Call
        const response = await fetch(`http://127.0.0.1:5050/api/notes/addnotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMmJhNzE5MWFlMzQzMTZiZjg3ZjI3In0sImlhdCI6MTY5NTgxODcxMX0.L_9tuL7GavrUiL1KX5hDB075XCoipxQ1Eqlg50yrjm8",
          },
          body: JSON.stringify({title, description, tag}),
        });
        // const json = response.json();

    console.log("Adding a new Note");
    const note = {
      _id: "6121322f19553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async(id) => {
        //API Call
        const response = await fetch(`http://127.0.0.1:5000/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMmJhNzE5MWFlMzQzMTZiZjg3ZjI3In0sImlhdCI6MTY5NTgxODcxMX0.L_9tuL7GavrUiL1KX5hDB075XCoipxQ1Eqlg50yrjm8",
          },
        });
        const json = response.json();
        console.log(json)
    //TODO API CALL
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editnote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxMmJhNzE5MWFlMzQzMTZiZjg3ZjI3In0sImlhdCI6MTY5NTgxODcxMX0.L_9tuL7GavrUiL1KX5hDB075XCoipxQ1Eqlg50yrjm8",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addnote, deleteNote, editnote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
