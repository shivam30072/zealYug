import React, {useEffect, useState} from 'react'
import axios from "axios"

const NoteForm = ({
  BASE_URL,
  notes, 
  setAllNotes, 
  noteId, 
  noteDesc, 
  noteTitle, 
  setNoteDesc, 
  setNoteId, 
  setNoteTitle}) => {
    const [noteData, setNoteData] = useState({
        title: "",
        desc: "",
    })
    const [response, setResponse] = useState("")
    const {title, desc} = noteData

    const handleChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name]: e.target.value
        })
    }

    const updateNote = async () => {
      const editedNotedetails = {
        title,
        desc,
      };
      try {
       
        const { data } = await axios.patch(
          `${BASE_URL}/api/notes/${noteId}`,
          editedNotedetails,
        );
        let updatedNotes = notes.filter((t) => t._id !== data?.updatedNote?._id);
        const updatedNote = data?.updatedNote
        setAllNotes([updatedNote, ...updatedNotes]);
        setNoteId("");
        setNoteTitle("");
        setNoteDesc("");
        setResponse(data?.message)
      } catch (error) {
        console.log("Error while editing task", error);
        setResponse("error occured")
      }

      setTimeout(() => { setResponse("") }, 3000)

    };
  

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title || ! desc){
            alert("Both fields are mandatory")
            return
        }
        
        if(noteId){
          updateNote()
          return
        }
        try {            
            const payload = {
                title,
                desc,
            }
            const { data } = await axios.post(`${BASE_URL}/api/notes`, payload)
            console.log(data);
            setAllNotes([data.note, ...notes])
            setResponse(data.message)
        } catch (error) {
            console.log("error", error);
            setResponse("error occured")
        }

        setNoteData({
            title: "",
            desc: ""
        })

        setTimeout(() => { setResponse("") }, 3000)
    }

    useEffect(() => {
      setNoteData({
        title: noteTitle,
        desc: noteDesc
      })
    }, [noteTitle, noteDesc])

  return (
    <div className="hero min-h-screen bg-base-200">
        { response &&        
        <div className="toast toast-end z-10">
          <div className="alert alert-info">
             <span>{response}</span>
          </div>
        </div>
        }
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Add a Note</h1>
        <p className="py-6">Scared of forgetting something important, from now on store your note or to-do here, comeback and edit or delete. </p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input value={title} onChange={handleChange} type="text" placeholder="Title" name='title' className="input input-secondary input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea value={desc} onChange={handleChange} name='desc' className="textarea textarea-secondary min-h-[150px]" placeholder="Description"></textarea>
          </div>
          <div className="form-control mt-6">
            <button onClick={handleSubmit} className="btn btn-primary">{noteId ? "Update" : "Submit"}</button>
          </div>
        </form>
      </div>
    </div>
    
  </div>
  )
}

export default NoteForm