import Link from "next/link";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoaderTriangle from "@/component/LoaderTriangle";
import LoaderRect from "@/component/LoaderRect";
import axios from 'axios';

const NoteDetail = () => {
    const router = useRouter();
    const {id} = router.query;
    const [datas, setDatas] = useState(null);
    const [title, setTitle] = useState(""); // Tambahkan state untuk title
    const [body, setBody] = useState(""); // Tambahkan state untuk body
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            axios.get(`https://furnicraft.web.id/api/keep-me/${id}`)
                .then((res) => {
                    const data = res.data.data;
                    setDatas(data);
                    setTitle(data.title); // Set initial value for title
                    setBody(data.body);   // Set initial value for body
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
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

    const handleDeleteButton = (e) => {
        e.preventDefault();
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
                {datas && (
                    <form onSubmit={handleEditSubmit} >
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
                )}
            </article>
        </section>
    )
}

export default NoteDetail;
