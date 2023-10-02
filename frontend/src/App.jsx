import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Navbar from './components/Navbar'
import NoteForm from './components/NoteForm'
import AllNotes from './components/AllNotes'

function App() {
  const BASE_URL="https://note-taking-app-m8r0.onrender.com"

  const [notes, setAllNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [noteId, setNoteId] = useState();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [response, setResponse] = useState("")

  const editNote = (title, desc, id) => {
  setNoteTitle(title)
  setNoteDesc(desc)
  setNoteId(id)
  }
  const deleteNote = async (id) => {
    if (id) {
      try {        
        const { data } = await axios.delete(
          `${BASE_URL}/api/notes/${id}`,
        );
        const updatedNotes = notes.filter((t) => t._id !== id);
        setAllNotes(updatedNotes);
        setResponse(data?.message)
      } catch (error) {
        console.log("Error while deleting a task");
        setResponse("error occured")
      }

      setTimeout(() => { setResponse("") }, 3000)
    }
  }

  useEffect(() => {
    async function fetcAllNotes() {
      try {      
        const response = await axios.get(`${BASE_URL}/api/notes`,);
        const data = response.data?.allNotes;
        setAllNotes(data);
        setIsLoading(false);
      } catch (error) {
        console.log("error occured", error);
        setIsLoading(false);
      }
    }
    fetcAllNotes();
  }, [])

  return (
   <div>
    <Navbar />
    <NoteForm 
    setAllNotes={setAllNotes} 
    notes={notes} 
    noteId={noteId} 
    noteDesc={noteDesc} 
    noteTitle={noteTitle}
    setNoteId={setNoteId}
    setNoteDesc={setNoteDesc}
    setNoteTitle={setNoteTitle}
    BASE_URL={BASE_URL}
    />
    {isLoading === true ?
     <div>loading...</div> : 
    <AllNotes 
    setAllNotes={setAllNotes} 
    notes={notes} 
    editNote={editNote} 
    deleteNote={deleteNote} />}

    { response &&        
        <div className="toast toast-end z-10">
          <div className="alert alert-info">
             <span>{response}</span>
          </div>
        </div>
        }
   </div>
   
    )
}

export default App
