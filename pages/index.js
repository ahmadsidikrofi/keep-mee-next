import Link from 'next/link'
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react'
import Loader from '@/component/Loader';


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [searchNote, setSearchNote] = useState('');

  useEffect(() => {
    setTimeout(() => {
      fetch('https://furnicraft.web.id/api/keep-me')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setNotes(data.data);
          setIsLoading(false); // Data sudah tersedia, set isLoading menjadi false
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false); // Tangani kesalahan dengan mengubah isLoading menjadi false
        });
    }, 100)
  }, [40000]);
  return (
    <>
      <div className="search">
        <Icon icon="material-symbols:search" width="1.5em" className='search-icon' />
        <input type="text" value={searchNote} onChange={(e) => setSearchNote(e.target.value)} placeholder='ketik untuk mencari...' />
      </div>
      <div className="notes-list">
        {isLoading ? ( <Loader />) 
        : notes && notes.filter((note) => searchNote ? note.body.toLowerCase().includes(searchNote.toLowerCase()) 
        : true).map((note) => {
          return (
            <Link href={`/keep-mee/${note.id}`} key={note.id} className="link">
              <div className="note">
                <p>{note.body}</p>
                <div className="note-footer">
                  <small>{note.date}</small>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
export default Home;