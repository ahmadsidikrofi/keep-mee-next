import Link from "next/link";
import { Icon } from '@iconify/react';
import Head from "next/head";
import { useEffect, useState } from "react";

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
                <title>Keep mee | {children.type.name}</title>
                <meta name="keywords" content={children.type.name} />
            </Head>
            <div className={`header ${darkMode}`}>
                <div className="app-title">
                    <h1>Keep-mee</h1>
                    <h3>Note me</h3>
                </div>
                {/* <button className="save_dark_mode" onClick={toggleDarkMode}></button> */}
                <label className="switch">
                    <input type="checkbox" 
                    checked={darkMode === 'dark-mode'}
                    onChange={toggleDarkMode}/>
                    <span className="slider"></span>
                </label>
                <Link href={"/createNote"} title="Note baru" className="save"><Icon icon="solar:pen-bold" /></Link>
            </div>
            {children}
        </>
    )
}

export default Layout;