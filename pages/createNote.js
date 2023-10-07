import Link from "next/link";
import { Icon } from '@iconify/react';
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import SelectColor from "@/component/SelectColor";

const CreateNote = () => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const date = new Date();
    const route = useRouter();
    const editorRef = useRef(null);
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleBodyChange = (content, editor) => {
        // setBody(e.target.value);
        setBody(content)
    }

    const handleSubmiteNote = (e) => {
        e.preventDefault();
        const newNote = { body, title, bgColor, date: date.toLocaleDateString() };
        fetch('https://furnicraft.web.id/api/keep-me', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newNote)
        }).then(
            setIsLoading(true),
            setTimeout(() => {
                setIsLoading(false)
                route.push('/')
            }, 2000)
        ).catch((err) => {
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
                    <Editor
                        apiKey='o61nnuwogclhd3z601n2k0zh479m9kbnsivauhaxrlu4jco0'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>Buat note disini...</p>"
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'wordcount', 'emoticons'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | emoticons',
                            content_style: 'body { font-family:poppins; font-size:14px }'
                        }}
                        value={body} 
                        onEditorChange={handleBodyChange}
                    />
                    {/* <textarea value={body} onChange={handleBodyChange} placeholder="Buat note disini..." className="edit_body" rows="20" ></textarea> */}
                    <SelectColor setBgColor={setBgColor} />
                </form>
            </article>
        </section>
    )
}

export default CreateNote;