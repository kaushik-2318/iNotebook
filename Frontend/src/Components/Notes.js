import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Notesitem from "./Notesitem";
import AddNote from "./AddNote";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);
  const updateNote = (note) => {
    ref.current.toggle();
  };
  const ref = useRef(null)
  const [note, setNote]  = useState({title: "", description: "", tag: "default"})

  return (
    <>
      <AddNote />

      <button ref={ref} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"

      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">       <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  aria-describedby="emailHelp"
                  onChange={onchange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={onchange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  onChange={onchange}
                />
              </div>
              {/* <button type="submit" className="btn btn-primary" onClick={handleClick}> */}
                {/* Add Note */}
              {/* </button> */}
            </form></div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h2>Your Note</h2>
        {notes.map((notes) => {
          return (
            <Notesitem key={notes._id} updateNote={updateNote} note={notes} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
