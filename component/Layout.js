import Link from "next/link";
import { Icon } from '@iconify/react';
import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const pathVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0.1,
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
}

const Layout = ({ children }) => {
    const [darkMode, setDarkMode] = useState('');
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDarkMode = localStorage.getItem('dark');
            if (savedDarkMode) {
                setDarkMode(savedDarkMode);
            }
        }
    }, [])
    const toggleDarkMode = () => {
        if (darkMode === "light") {
            setDarkMode('dark-mode');
        } else {
            setDarkMode('light')
        }
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('dark', darkMode);
            document.body.className = darkMode;
        }
    }, [darkMode])

    return (
        <>
            <Head>
                <title>Keep mee | Bismillah</title>
                <meta name="keywords" content="Keep mee" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="style" />
            </Head>
            <motion.div className={`header ${darkMode}`}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <motion.svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 36 36" style={{ marginTop: "8px" }}>
                        <motion.path variants={pathVariants} initial="hidden" animate="visible" fill="#fbbc04" d="m33 6.4l-3.7-3.7a1.71 1.71 0 0 0-2.36 0L23.65 6H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V11.76l3-3a1.67 1.67 0 0 0 0-2.36ZM18.83 20.13l-4.19.93l1-4.15l9.55-9.57l3.23 3.23ZM29.5 9.43L26.27 6.2l1.85-1.85l3.23 3.23Z" className="clr-i-solid clr-i-solid-path-1"/>
                        <motion.path variants={pathVariants} fill="none" d="M0 0h36v36H0z"/>
                    </motion.svg>
                </div>
                <div className="app-title">
                    <h1>Keep-mee</h1>
                    {/* <h4>Note mee</h4> */}
                </div>
                <label className="switch">
                    <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
                    <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
                    <input type="checkbox" className="input"
                        checked={darkMode === 'dark-mode'}
                        onChange={toggleDarkMode} />
                    <span className="slider"></span>
                </label>
                <Link href={"/createNote"} title="Note baru" className="save"><Icon icon="solar:pen-bold" /></Link>
            </motion.div>
            {children}
        </>
    )
}

export default Layout;