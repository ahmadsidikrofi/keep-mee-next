import Link from "next/link";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { useRouter } from "next/router";
import LoaderTriangle from "@/component/LoaderTriangle";
import LoaderRect from "@/component/LoaderRect";

export const getStaticPaths = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/api/keep-me');
    const data = await res.json();
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
    const res = await fetch('http://127.0.0.1:8000/api/keep-me/' + id)
    const data = await res.json();
    if (!data.data) {
        return {
            notFound: true, // Menandakan bahwa halaman tidak ditemukan
        };
    }
    return {
        props: { note: data.data }
    }
}
const NoteDetail = ({ note }) => {
    const [ title, setTitle ] = useState(note.title);
    const [ body, setBody ] = useState(note.body);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const id = router.query.id;
        const editNote = { title, body }
        fetch('https://furnicraft.web.id/api/keep-me/'+id, {
            method: "PUT",
            headers: { "content-type" : "application/json" },
            body: JSON.stringify(editNote),
        }).then (
            setIsLoading(true),
            setTimeout(() => {
                setIsLoading(false);
                router.push('/')
            }, 3000)
        )
    }

    const handleDeleteButton = () => {
        const id = router.query.id;
        fetch(`https://furnicraft.web.id/api/keep-me/${id}`, {
            method: "DELETE"
        }).then(
            setIsLoading(true),
            setTimeout(() => {
                setIsLoading(false);
                router.push('/')    
            },3000)
        )
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