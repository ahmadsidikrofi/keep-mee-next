import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import LoaderRect from "./LoaderRect";

export const AUTO_SAVE_DELAY = 2000; // Waktu penundaan autosave

export default function Autosave({ title, body, bgColor, slug }) {
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Callback yang akan dipanggil saat pengguna mengetik
  const handleTyping = () => {
    // Hapus timeout yang ada jika ada
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Atur timeout baru untuk memicu autosave setelah AUTO_SAVE_DELAY
    const newTimeout = setTimeout(() => {
      saveNote();
    }, AUTO_SAVE_DELAY);

    setTypingTimeout(newTimeout);
  };

  // Callback untuk menyimpan catatan
  const saveNote = () => {
    const editNote = { title, body, bgColor, slug };
    axios.put(`https://furnicraft.web.id/api/keep-me/${slug}`, editNote, {
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

  // Effect untuk mengatur autosave saat ada perubahan pada title atau body
  useEffect(() => {
    handleTyping();
  }, [title, body ]);

  // Do not display anything on the screen.
  // return null;
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