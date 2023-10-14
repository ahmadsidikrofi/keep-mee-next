import Link from 'next/link'
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react'
import Loader from '@/component/Loader';
import axios from 'axios'; // Import axios
import { motion } from 'framer-motion';
import Pinned from '@/component/Pinned';
import ColumnChanger from '@/component/ColumnChanger';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [searchNote, setSearchNote] = useState('');
  const [changeLayout, setChangeLayout] = useState('');

  useEffect(() => {
    // Gunakan async/await untuk mengambil data dengan axios
    const fetchData = async () => {
      try {
        const response = await axios.get('https://furnicraft.web.id/api/keep-me');

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const allNotes = response.data.data;

        // Gabungkan note yang terpin dengan note yang tidak terpin
        const updateNote = allNotes.map((note) => {
          const isPinned = localStorage.getItem(`${note.slug}_pinned`) === 'true'
          return { ...note, pinned: isPinned }
        })
        updateNote.sort((noteSebelumnya, noteTerpin) => noteTerpin.pinned - noteSebelumnya.pinned)
        setNotes(updateNote);
        setIsLoading(false); // Data sudah tersedia, set isLoading menjadi false
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="search">
        <Icon icon="material-symbols:search" width="1.5em" className='search-icon' />
        <input type="text" value={searchNote} onChange={(e) => setSearchNote(e.target.value)} placeholder='ketik untuk mencari...' />
        <ColumnChanger changeLayout={changeLayout} setChangeLayout={setChangeLayout} />
      </div>
      <div className={`notes-list ${changeLayout}`}>
        {isLoading ? (<Loader />)
          : notes && notes.filter((note) => searchNote ? note.title.toLowerCase().includes(searchNote.toLowerCase())
            : true)
            .map((note) => {
              return (
                <>
                    <motion.div className="note" key={note.id} style={{ backgroundColor: note.bgColor }}
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: `0px 0px 8px ${note.bgColor ? note.bgColor : '#fef68a'}`,
                        transition: {
                          type: "spring",
                          stiffness: 120,
                        }
                      }}
                    >
                      <Link href={`/keep-mee/${note.slug}`} key={note.id} className="link">
                        <p style={{ paddingBottom: 60 }}><strong>{note.title}</strong></p>
                      </Link>
                      <div className="note-footer">
                      <small>{note.date}</small>
                      <Pinned note={note} notes={notes} setNotes={setNotes}/>
                      </div>
                    </motion.div>
                </>
              )
            })}
      </div>
    </>
  )
}

export default Home;
