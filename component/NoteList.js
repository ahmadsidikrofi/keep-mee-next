import Link from "next/link";
import { useState, useEffect } from "react";

const NoteList = ({ notes }) => {
    // return (
    //     <>
    //         <div className="notes-list">
    //             {notes.map((note) => {
    //                 return (
    //                     <Link href={`/keep-mee/${note.id}`} key={note.id} className="link">
    //                         <div className="note">
    //                             <p>{note.body}</p>
    //                             <div className="note-footer">
    //                                 <small>{note.date}</small>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                 )
    //             })}
    //         </div>
    //     </>
    // )
}

export default NoteList;
