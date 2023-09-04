import React, {useState, useEffect} from 'react'
// import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton';

// const getMonth = () => {
//   const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//   let m = new Date().getMonth();
//   return months[m];
// }

const getEntries = (notes) => {
  let s = '';
  if (notes.length === 1) {
    s = `1 entry`;
  } else {
    s = `${notes.length} entries`;
  }
  return s;
}

const NotesListPage = () => {
  // set state
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async () => {
    let response = await fetch("http://localhost:8000/notes/");
    let data = await response.json();
    setNotes(data);
  }

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; My Entries</h2>
        <p className='notes-count'><i>{getEntries(notes)}</i></p>
      </div>
        <div className="notes-list">
            {notes.map((note, index) => (
                <ListItem key={index} note={note}/>
            ))}
        </div>
        <AddButton />
    </div>
  )
}

export default NotesListPage
