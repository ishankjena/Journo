import React from 'react'
import { Link } from 'react-router-dom'

const getTitle = (note) => {
    let title = note.body.split('\n')[0];
    if (title.length > 45) {;
        return title.slice(0,45);
    }
    return title;
}

const getContent = (note) => {
    let title = getTitle(note);
    let content = note.body.replaceAll('\n', ' ');
    content = content.replaceAll(title, "");    
    if (content.length > 45){
        return content.slice(0, 45);
    }
    return content;
}

const ListItem = ({note}) => {
    return (
        <div className='notes-list-item'>
            <Link to={`/note/${note.id}`}>
                <h4>{getTitle(note)}</h4>
                <p>{note.updated} - {getContent(note)}</p>
            </Link>
        </div>
    )
}

export default ListItem
