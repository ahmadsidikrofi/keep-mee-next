import Link from "next/link";
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import LoaderTriangle from "@/component/LoaderTriangle";
import LoaderRect from "@/component/LoaderRect";
import axios from 'axios';
import { Editor } from "@tinymce/tinymce-react";

const NoteDetail = () => {
    const router = useRouter();
    const {id} = router.query;
    const [datas, setDatas] = useState(null);
    const [title, setTitle] = useState(""); // Tambahkan state untuk title
    const [body, setBody] = useState(""); // Tambahkan state untuk body
    const [isLoading, setIsLoading] = useState(false);
    const editorRef = useRef(null);

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

    const handleBodyChange = (content, editor) => {
        setBody(content)
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
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Editor
                            apiKey='o61nnuwogclhd3z601n2k0zh479m9kbnsivauhaxrlu4jco0'
                            onInit={(evt, editor) => editorRef.current = editor}
                            // initialValue={body}
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
