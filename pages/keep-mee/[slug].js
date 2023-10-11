import Link from "next/link";
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import LoaderTriangle from "@/component/LoaderTriangle";
import LoaderRect from "@/component/LoaderRect";
import axios from 'axios';
import { Editor } from "@tinymce/tinymce-react";
import Pinned from "@/component/Pinned";

const NoteDetail = () => {
    const router = useRouter();
    const {slug} = router.query;
    const [datas, setDatas] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bgColor, setBgColor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        if (slug) {
            axios.get(`https://furnicraft.web.id/api/keep-me/${slug}`)
                .then((res) => {
                    const data = res.data.data;
                    setDatas(data);
                    setTitle(data.title);
                    setBody(data.body);
                    setBgColor(data.bgColor);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [slug]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const editNote = { title, body, bgColor };
        
        axios.put(`https://furnicraft.web.id/api/keep-me/${slug}`, editNote, {
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
        axios.delete(`https://furnicraft.web.id/api/keep-me/${slug}`)
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

    const handleBodyChange = (content, editor) => {
        setBody(content)
    }

    const togglePin = (note) => {
        // Simpan status "pinned" secara lokal (gunakan localStorage)
        note.pinned = !note.pinned
        localStorage.setItem(`${note.slug}_pinned`, note.pinned)
    };

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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Pinned note={datas} togglePin={togglePin} style={{ marginTop: 50 }} />
                        </div>
                        <Editor
                            apiKey='o61nnuwogclhd3z601n2k0zh479m9kbnsivauhaxrlu4jco0'
                            onInit={(evt, editor) => editorRef.current = editor}
                            // initialValue={body}
                            init={{
                                height: 400,
                                menubar: true,
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

                        {/* <textarea value={body} 
                            rows="20" 
                            className="edit_body"
                            onChange={(e) => setBody(e.target.value)}>
                        </textarea> */}
                    </form>
                )}
            </article>
        </section>
    )
}

export default NoteDetail;
