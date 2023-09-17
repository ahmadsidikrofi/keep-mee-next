import Link from "next/link";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { useRouter } from "next/router";
import LoaderTriangle from "@/component/LoaderTriangle";
import LoaderRect from "@/component/LoaderRect";
import axios from 'axios'; // Import axios

export const getStaticPaths = async () => {
    const response = await axios.get('https://furnicraft.web.id/api/keep-me');
    const data = response.data;
    const paths = data.data.map((note) => {
        return {
            params: { id: note.id.toString() }
        }
    })

    return {
        paths, fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    try {
        const response = await axios.get(`https://furnicraft.web.id/api/keep-me/${id}`);
        const data = response.data;
        
        if (!data.data) {
            return {
                notFound: true, // Menandakan bahwa halaman tidak ditemukan
            };
        }
        
        return {
            props: { note: data.data }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true, // Tangani kesalahan dengan menampilkan halaman 404
        };
    }
}

const NoteDetail = ({ note }) => {
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const id = router.query.id;
        const editNote = { title, body };
        
        axios.put(`https://furnicraft.web.id/api/keep-me/${id}`, editNote, {
            headers: { "Content-Type": "application/json" },
        })
        .then(() => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                router.push('/');
            }, 3000);
        })
        .catch((error) => {
            console.error('Error updating data:', error);
        });
    }

    const handleDeleteButton = () => {
        const id = router.query.id;
        
        axios.delete(`https://furnicraft.web.id/api/keep-me/${id}`)
        .then(() => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                router.push('/');
            }, 3000);
        })
        .catch((error) => {
            console.error('Error deleting data:', error);
        });
    }

    return (
        <section className="create_blog">
            <article>
                <form onSubmit={handleEditSubmit}>
                    <span></span>
                    <div className="btn">
                        <Link href="/" className="arrow_back"><Icon icon="ic:twotone-arrow-back-ios" /></Link>
                        {isLoading ? <LoaderRect />
                            : <button onClick={handleDeleteButton} className="delete_button">
                                <Icon icon="material-symbols:delete-outline" width="20" height="20" className="delete_icon" />
                            </button>
                        }
                        {isLoading ? <LoaderTriangle /> : <button>Save</button>}
                    </div>
                    <input type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}/>
                    <textarea value={body} rows="20" className="edit_body"
                    onChange={(e) => setBody(e.target.value)}></textarea>
                </form>
            </article>
        </section>
    )
}

export default NoteDetail;
