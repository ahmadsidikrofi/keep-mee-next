import Link from 'next/link'
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react'
import Loader from '@/component/Loader';
import axios from 'axios'; // Import axios
import { motion } from 'framer-motion';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [searchNote, setSearchNote] = useState('');

  useEffect(() => {
    // Gunakan async/await untuk mengambil data dengan axios
    const fetchData = async () => {
      try {
        const response = await axios.get('https://furnicraft.web.id/api/keep-me');

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        setNotes(response.data.data);
        setIsLoading(false); // Data sudah tersedia, set isLoading menjadi false
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Tangani kesalahan dengan mengubah isLoading menjadi false
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="search">
        <Icon icon="material-symbols:search" width="1.5em" className='search-icon' />
        <input type="text" value={searchNote} onChange={(e) => setSearchNote(e.target.value)} placeholder='ketik untuk mencari...' />
      </div>
      <div className="notes-list">
        {isLoading ? (<Loader />)
          : notes && notes.filter((note) => searchNote ? note.title.toLowerCase().includes(searchNote.toLowerCase())
            : true).map((note) => {
              return (
                <Link href={`/keep-mee/${note.id}`} key={note.id} className="link">
                  <motion.div className="note" style={{ backgroundColor: note.bgColor }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0px 0px 8px #333",
                      transition: {
                        type: "spring",
                        stiffness: 700,
                      }
                    }}
                  >
                    <p><strong>{note.title}</strong></p>
                    <div className="note-footer">
                      <small>{note.date}</small>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
      </div>
    </>
  )
}

export default Home;
