import Link from "next/link";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/component/Loader";

const CreateNote = () => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const date = new Date();
    const route = useRouter();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value);
    }

    const handleSubmiteNote = (e) => {
        e.preventDefault();
        const newNote = { body, title, date: date.toLocaleDateString() };
        fetch('https://furnicraft.web.id/api/create/keep-me', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newNote)
        }).then(
            setIsLoading(true),
            setTimeout(() => {
                setIsLoading(false)
                route.push('/')
            }, 2000)   
        ).catch ((err) => {
            console.log("Note gagal ditambah", + err);
            setIsLoading(false);
        })
    }
    return (
        <section className="create_blog">
            <article>
                <form onSubmit={handleSubmiteNote} >
                    <span></span>
                    <div className="btn">
                        <Link href="/" className="arrow_back"><Icon icon="ic:twotone-arrow-back-ios" /></Link>
                        {isLoading ? 
                            <div className="loader">
                                <svg viewBox="0 0 80 80">
                                    <circle id="test" cx="40" cy="40" r="32"></circle>
                                </svg>
                            </div>
                            : <button>Save</button>}
                    </div>
                    <input value={title} onChange={handleTitleChange} type="text" placeholder="Ketik judul note" />
                    <textarea value={body} onChange={handleBodyChange} placeholder="Buat note disini..." rows="20" className="edit_body"></textarea>
                </form>
            </article>
        </section>
    )
}

export default CreateNote;