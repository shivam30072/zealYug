import React from 'react'
import NoteCard from './NoteCard'

const AllNotes = ({notes, editNote, deleteNote}) => {
  return (
    <>
    <div className="carousel carousel-center max-w-full p-4 space-x-4 bg-base-200 ">
 {notes.map(note => (
     <NoteCard key={note._id} note={note} editNote={editNote} deleteNote={deleteNote}/>

 ))}
</div>
</>
  )
}

export default AllNotes