import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { motion } from "framer-motion";
import { rgb } from "chroma-js";

const ColumnChanger = ({ changeLayout, setChangeLayout }) => {
    useEffect(() => {
        if (typeof window != 'undefined') {
            const updateLayout = localStorage.getItem('layout_keep-mee');
            if (updateLayout) {
                setChangeLayout(updateLayout);
            };
        }
    }, []);

    const toggleLayout = () => {
        if (changeLayout === "FIRST-GRID-LAYOUT") {
            setChangeLayout('SECOND-GRID-LAYOUT');
        } else {
            setChangeLayout('FIRST-GRID-LAYOUT');
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const gridLayout = document.querySelector('.notes-list');
            gridLayout.style.gridTemplateColumns = changeLayout;
            localStorage.setItem('layout_keep-mee', changeLayout);
        }
    }, [changeLayout]);

    const layoutVariants = {
        hidden: {
            x: 100,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        },

    }
    const iconVariants = {
        hidden: {
            x: 100,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1
        },
        hover: {
            scale: 1.1,
            padding: 5,
            // paddingTop: 3,
            borderRadius: 5,
            color: '#ffffff',
            backgroundColor: '#ee3d63'
        }
    }

    return (
        <motion.label className='changeColumn'
            variants={layoutVariants}
            initial="hidden"
            animate="visible"
            // animate={changeLayout ? 'visible' : 'hidden'}
        >
          <input type="checkbox" onChange={toggleLayout} checked={changeLayout === "FIRST-GRID-LAYOUT"}/>
          <div className='changeColumn-icon'>
            { changeLayout === "FIRST-GRID-LAYOUT" ? 
                <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap={{ scale: 0 }}
                >
                    <Icon icon="ion:grid-outline" width="1.5em" /> 
                </motion.div>
                : 
                <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap={{ scale: 0 }}
                >
                    <Icon icon="circum:grid-2-h" width="1.5em"/> 
                </motion.div>
            }
          </div>
        </motion.label>
    )
}
export default ColumnChanger;