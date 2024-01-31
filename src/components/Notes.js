import React, { useContext, useRef,useState } from "react";
import noteContext from "../context/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  let history = useNavigate();

  const context = useContext(noteContext);
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      history("/login");

    }
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

  };
  const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
}
const handleClick=(e)=>{
  console.log("updating value")
  editNote(note.id,note.etitle,note.edescription,note.etag)
  ref.current.click();
  props.showAlert("Updated Successfully","success");    

}
  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 ||note.etag.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length==0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
