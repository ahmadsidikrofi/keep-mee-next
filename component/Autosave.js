import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';

export const AUTO_SAVE_DELAY = 2000; // Waktu penundaan autosave

export default function Autosave({ title, body, bgColor, id }) {
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTyping = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      saveNote();
    }, AUTO_SAVE_DELAY);

    setTypingTimeout(newTimeout);
  };

  const saveNote = () => {
    const editNote = { title, body, bgColor, id };
    axios.put(`https://flowbeat.web.id/api/edit/keep-me/${id}`, editNote, {
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        console.log("Note saved successfully!");
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
  };

  useEffect(() => {
    handleTyping();
  }, [title, body ]);

  return (
    <>
      {isLoading ? 
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
      </div>
      : <button>Save</button>}
    </>
  )
}