import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
// import notes from '../assets/data';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { ReactComponent as DeleteButton } from '../assets/delete-button-svgrepo-com.svg';
import { ReactComponent as DoneButton } from '../assets/round-done-button-svgrepo-com.svg';

const NotePage = () => {
    let params = useParams();
    const noteId = params.id;
    
    // set state
    let [note, setNote] = useState(null);
    
    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if(noteId==='new') return
        let response = await fetch(`http://localhost:8000/notes/${noteId}`);
        let data = await response.json();
        setNote(data);
    }

    let updateNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date().toJSON().slice(0,10).split('-').join('/') })
        });
    }

    let navigate = useNavigate();
    
    let handleSubmit = async () => {
        if(noteId!='new' && !note.body){
            deleteNote();
        }else if(noteId!=='new'){
            updateNote();
        }else if(noteId==='new' && note!==null){
            createNote();
        }
        updateNote();
        navigate('/');
    };

    let handleDelete = async () => {
        deleteNote();
        navigate('/');
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    let createNote = async () => {
        await fetch(`http://localhost:8000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date().toJSON().slice(0,10).split('-').join('/') })
        });
    }

    // let note = notes.find(note => note.id===Number(noteId))
    return (
        <div className='note'>
            <div className='note-header'>
                <Link to={"/"}>
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
                {note?.updated}

                {noteId !=='new' ? (
                    <button className='delete-btn' onClick={handleDelete}><DeleteButton/></button>
                ): (
                    <button className='done-btn' onClick={handleSubmit}><DoneButton/></button>
                )}
                
            </div>
            <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}} value={note?.body}>
                
            </textarea>
        </div>
    )
}

export default NotePage