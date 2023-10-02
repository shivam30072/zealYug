import React from 'react'

const NoteCard = ({note, editNote, deleteNote}) => {

    const handleEdit = () => {
        editNote(note.title, note.desc, note._id)
    }
    const handleDelete = () => {
        deleteNote(note._id)
    }
  return (
    <div className="carousel-item">
        
      <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{note.title}</h2>
    <p>{note.desc}</p>
    <div className="card-actions justify-end">
      <button onClick={handleEdit} className="btn btn-primary">Edit</button>
      <button onClick={handleDelete} className="btn btn-primary">Delete</button>
    </div>
  </div>
</div>
  </div> 
  )
}

export default NoteCard