import Select, { StylesConfig, components } from 'react-select';
import chroma from "chroma-js";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SelectColor = ({ setBgColor }) => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const colorOptions = [ 
        { value: '#F06292', label: 'Barbie', color: '#F06292' },
        { value: '#BA68C8', label: 'Scorpio', color: '#BA68C8' },
        { value: '#FFD54F', label: 'Leo', color: '#FFD54F' },
        { value: '#4FC3F7', label: 'Gemini', color: '#4FC3F7' },
        { value: '#AED581', label: 'Taurus', color: '#AED581' },
    ];
    const dot = (color = 'transparent') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 20,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 15,
            width: 15,
        },
    });
    const colourStyles = {
        menu: (styles) => ({
            ...styles,
            position: 'absolute', 
            zIndex: 9999,
            marginTop: "130px",
            borderRadius: 15,
        }),
        control: (styles) => ({ ...styles, borderRadius: 15, paddingLeft: 20 }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.2).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    }
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    }
    useEffect(() => {
        if (isMenuOpen) {
            let MenuScroll = document.querySelector(".selectColor");
            MenuScroll.style.marginBottom = "150px"
            window.scroll({ top: document.body.scrollHeight, behavior: "smooth" })
        } else if (isMenuOpen === false) {
            let MenuScroll = document.querySelector(".selectColor");
            MenuScroll.style.marginBottom = "20px";
            window.scroll({ top: document.body.scrollHeight, behavior: "smooth" });
        };
    }, [isMenuOpen])
    return (
        <motion.div
            className="selectColor"
            onClick={() => handleOpenMenu()}
            onBlur={() => handleCloseMenu()}
        >
            <Select
                options={colorOptions}
                className='selectColor'
                onChange={(e) => setBgColor(e.value)}
                styles={colourStyles}
                placeholder="Buat warna notemu"
                components={{
                    // Menggunakan AnimatePresence untuk mengendalikan opsi yang muncul atau menghilang
                    MenuList: ({ children, ...rest }) => (
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                    style={{ backgroundColor: "#333" }}
                                >
                                    <components.Menu {...rest}>{children}</components.Menu>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ),
                }}
            />
        </motion.div>
    );
}

export default SelectColor;